import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { CategoryService } from 'src/category/services/category.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private readonly categoryService: CategoryService
  ) {}

  async getAllTasksByCategoryId(
    user: User,
    categoryId: number
  ): Promise<Task[]> {
    const isMember = await this.categoryService.isMember(user, categoryId);
    if (!isMember) {
      throw new ForbiddenException(
        'You have no access to projects from this group'
      );
    }
    return await this.taskRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });
  }

  async getTaskById(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['category'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async createTask(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const { categoryId, ...taskDto } = createTaskDto;

    const isMember = this.categoryService.isMember(user, categoryId);
    if (!isMember) {
      throw new ForbiddenException(
        'You have rights to create a task for this category'
      );
    }

    const existingTasks = await this.getAllTasksByCategoryId(user, categoryId);
    const nextIndex = existingTasks.length > 0 ? existingTasks.length + 1 : 1;

    const category = await this.categoryService.getCategoryById(categoryId);
    const task = {
      ...taskDto,
      category,
      index: nextIndex,
    };
    const newTask = this.taskRepository.create(task);
    return await this.taskRepository.save(newTask);
  }

  async updateTask(
    user: User,
    taskId: number,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.getTaskById(taskId);
    const updatedTask = { ...task, ...updateTaskDto };

    if (updateTaskDto.index) {
      const tasks = await this.getAllTasksByCategoryId(user, task.category.id);

      if (updateTaskDto.index > tasks.length) {
        throw new BadRequestException(
          'Index cannot be bigger than the current length of tasks'
        );
      }

      const oldIndex = task.index;
      const newIndex = updateTaskDto.index;

      if (oldIndex < newIndex) {
        for (let i = oldIndex + 1; i <= newIndex; i++) {
          const taskToUpdate = tasks.find((t) => t.index === i);
          if (taskToUpdate) {
            taskToUpdate.index--;
          }
        }
      } else if (oldIndex > newIndex) {
        for (let i = oldIndex - 1; i >= newIndex; i--) {
          const taskToUpdate = tasks.find((t) => t.index === i);
          if (taskToUpdate) {
            taskToUpdate.index++;
          }
        }
      }

      // Save all the modified tasks in bulk
      await this.taskRepository.save(tasks);
      updatedTask.index = newIndex;
    }

    return await this.taskRepository.save(updatedTask);
  }

  async deleteTask(taskId: number): Promise<void> {
    const result = await this.taskRepository.delete(taskId);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
  }

  async isMember(user: Partial<User>, taskId: number): Promise<boolean> {
    const task = await this.getTaskById(taskId);
    return await this.categoryService.isMember(user, task.category.id);
  }
}

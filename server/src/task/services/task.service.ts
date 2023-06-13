import {
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

    const category = await this.categoryService.getCategoryById(categoryId);
    const task = {
      ...taskDto,
      category,
    };
    const newTask = this.taskRepository.create(task);
    return await this.taskRepository.save(newTask);
  }

  async updateTask(
    taskId: number,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.getTaskById(taskId);
    const updatedTask = { ...task, ...updateTaskDto };
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

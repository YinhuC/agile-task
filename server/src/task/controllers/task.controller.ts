import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Task } from '../task.entity';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/user.entity';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { TaskMemberGuard } from '../guards/task-member.guard';
import { GetTaskDto } from '../dto/get-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async getCategoryTasks(
    @AuthUser() user: User,
    @Body() getTaskDto: GetTaskDto
  ): Promise<Task[]> {
    return await this.taskService.getAllTasksByCategoryId(
      user,
      getTaskDto.categoryId
    );
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard, TaskMemberGuard)
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return await this.taskService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async createTask(
    @AuthUser() user: User,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    return await this.taskService.createTask(user, createTaskDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard, TaskMemberGuard)
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    return await this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, TaskMemberGuard)
  async deleteTask(@Param('id') id: number): Promise<void> {
    await this.taskService.deleteTask(id);
  }
}

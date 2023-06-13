import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../project.entity';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/user.entity';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getAllProjects(@AuthUser() user: User): Promise<Project[]> {
    return await this.projectService.getAllProjects(user);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async getProjectById(
    @AuthUser() user: User,
    @Param('id') id: number
  ): Promise<Project> {
    return await this.projectService.getProjectById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async createProject(
    @Body() createProjectDto: CreateProjectDto
  ): Promise<Project> {
    return await this.projectService.createProject(createProjectDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async updateProject(
    @AuthUser() user: User,
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return await this.projectService.updateProject(id, updateProjectDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  async deleteProject(
    @AuthUser() user: User,
    @Param('id') id: number
  ): Promise<void> {
    await this.projectService.deleteProject(id, user);
  }
}

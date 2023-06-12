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
import { GetProjectDto } from '../dto/get-project.dto';
import { DeleteProjectDto } from '../dto/delete-project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async getAllProjects(
    @Body() getProjectDto: GetProjectDto
  ): Promise<Project[]> {
    return await this.projectService.getAllProjects(getProjectDto.groupId);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async getProjectById(
    @Param('id') id: number,
    @Body() getProjectDto: GetProjectDto
  ): Promise<Project> {
    return await this.projectService.getProjectById(id, getProjectDto.groupId);
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
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return await this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async deleteProject(
    @Param('id') id: number,
    @Body() deleteProjectDto: DeleteProjectDto
  ): Promise<void> {
    await this.projectService.deleteProject(id, deleteProjectDto.groupId);
  }
}

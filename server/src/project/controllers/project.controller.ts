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
import { GetProjectDto } from '../dto/get-project.dto';
import { ProjectMemberGuard } from '../guards/project-member.guard';

@UseGuards(AuthenticatedGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getGroupProjects(
    @AuthUser() user: User,
    @Body() getProjectDto: GetProjectDto
  ): Promise<Project[]> {
    return await this.projectService.getAllProjectsByGroupId(
      user,
      getProjectDto.groupId
    );
  }

  @Get(':id')
  @UseGuards(ProjectMemberGuard)
  async getProjectById(@Param('id') id: number): Promise<Project> {
    return await this.projectService.getProjectById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createProject(
    @AuthUser() user: User,
    @Body() createProjectDto: CreateProjectDto
  ): Promise<Project> {
    return await this.projectService.createProject(user, createProjectDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(ProjectMemberGuard)
  async updateProject(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    return await this.projectService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(ProjectMemberGuard)
  async deleteProject(@Param('id') id: number): Promise<void> {
    await this.projectService.deleteProject(id);
  }
}

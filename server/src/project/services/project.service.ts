import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../project.entity';
import { GroupService } from 'src/group/services/group.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly groupService: GroupService
  ) {}

  async getAllProjects(groupId: number): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { group: { id: groupId } },
    });
  }

  async getProjectById(projectId: number, groupId: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId, group: { id: groupId } },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    return project;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { groupId, ...projectDto } = createProjectDto;
    const group = await this.groupService.getGroupById(groupId);
    const project = {
      ...projectDto,
      group: group,
    };
    const newProject = this.projectRepository.create(project);
    return await this.projectRepository.save(newProject);
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    const project = await this.getProjectById(id, updateProjectDto.groupId);
    const updatedProject = { ...project, ...updateProjectDto };
    return await this.projectRepository.save(updatedProject);
  }

  async deleteProject(id: number, groupId: number): Promise<void> {
    const project = await this.getProjectById(id, groupId);
    await this.projectRepository.remove(project);
  }
}

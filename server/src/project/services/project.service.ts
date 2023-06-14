import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../project.entity';
import { GroupService } from 'src/group/services/group.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly groupService: GroupService
  ) {}

  async getAllProjectsByGroupId(
    user: User,
    groupId: number
  ): Promise<Project[]> {
    const isMember = await this.groupService.isMember(user, groupId);
    if (!isMember) {
      throw new ForbiddenException(
        'You have no access to projects from this group'
      );
    }
    return await this.projectRepository
      .createQueryBuilder('project')
      .innerJoin('project.group', 'group')
      .where('group.id = :groupId', { groupId })
      .getMany();
  }

  async getProjectById(projectId: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['group'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    return project;
  }

  async createProject(
    user: User,
    createProjectDto: CreateProjectDto
  ): Promise<Project> {
    const { groupId, ...projectDto } = createProjectDto;

    const isMember = this.groupService.isMember(user, groupId);
    if (!isMember) {
      throw new ForbiddenException(
        'You have rights to create a project for this group'
      );
    }

    const group = await this.groupService.getGroupById(groupId);
    const project = {
      ...projectDto,
      group,
    };
    const newProject = this.projectRepository.create(project);
    return await this.projectRepository.save(newProject);
  }

  async updateProject(
    projectId: number,
    updateProjectDto: UpdateProjectDto
  ): Promise<Project> {
    const project = await this.getProjectById(projectId);
    const updatedProject = { ...project, ...updateProjectDto };
    return await this.projectRepository.save(updatedProject);
  }

  async deleteProject(projectId: number): Promise<void> {
    const result = await this.projectRepository.delete(projectId);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
  }

  async isMember(user: Partial<User>, projectId: number): Promise<boolean> {
    const project = await this.getProjectById(projectId);
    return await this.groupService.isMember(user, project.group.id);
  }
}

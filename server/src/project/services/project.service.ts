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
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly groupService: GroupService,
    private readonly userService: UserService
  ) {}

  async getAllProjects(user: User): Promise<Project[]> {
    const groups = await this.userService.getUserGroups(user.id);
    if (!groups) return [];
    const groupIds = groups.map((group) => group.id);
    return await this.projectRepository
      .createQueryBuilder('project')
      .where('project.groupId IN (:...groupIds)', { groupIds })
      .getMany();
  }

  async getProjectById(projectId: number, user: User): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: ['group'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const isMember = await this.isMember(user, project);
    if (!isMember) {
      throw new ForbiddenException('You have no access to this project');
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
    projectId: number,
    updateProjectDto: UpdateProjectDto,
    user: User
  ): Promise<Project> {
    const project = await this.getProjectById(projectId, user);
    const updatedProject = { ...project, ...updateProjectDto };
    return await this.projectRepository.save(updatedProject);
  }

  async deleteProject(projectId: number, user: User): Promise<void> {
    const project = await this.getProjectById(projectId, user);
    await this.projectRepository.remove(project);
  }

  async isMember(user: User, project: Project): Promise<boolean> {
    const groups = await this.userService.getUserGroups(user.id);
    if (!groups) return false;
    return groups.some((group) => group.id === project.group.id);
  }
}

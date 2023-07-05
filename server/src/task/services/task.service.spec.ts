import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../../category/services/category.service';
import { ProjectService } from '../../project/services/project.service';
import { GroupService } from '../../group/services/group.service';
import { UserService } from '../../user/services/user.service';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { Task as TaskEntity } from '../../shared/entities/task.entity';
import { Group as GroupEntity } from '../../shared/entities/group.entity';
import { Project as ProjectEntity } from '../../shared/entities/project.entity';
import { Category as CategoryEntity } from '../../shared/entities/category.entity';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: {},
        },
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {},
        },
        ProjectService,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: {},
        },
        GroupService,
        {
          provide: getRepositoryToken(GroupEntity),
          useValue: {},
        },
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

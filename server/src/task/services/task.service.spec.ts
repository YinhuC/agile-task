import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../../shared/entities/task.entity';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../shared/entities/category.entity';
import { ProjectService } from '../../project/services/project.service';
import { Project } from '../../shared/entities/project.entity';
import { GroupService } from '../../group/services/group.service';
import { Group } from '../../shared/entities/group.entity';
import { UserService } from '../../user/services/user.service';
import { User } from '../../shared/entities/user.entity';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: {},
        },
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {},
        },
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useValue: {},
        },
        GroupService,
        {
          provide: getRepositoryToken(Group),
          useValue: {},
        },
        UserService,
        {
          provide: getRepositoryToken(User),
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

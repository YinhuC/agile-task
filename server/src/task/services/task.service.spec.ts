import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../task.entity';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/category.entity';
import { ProjectService } from '../../project/services/project.service';
import { Project } from '../../project/project.entity';
import { GroupService } from '../../group/services/group.service';
import { Group } from '../../group/group.entity';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/user.entity';

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

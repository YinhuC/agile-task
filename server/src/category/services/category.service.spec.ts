import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { ProjectService } from '../../project/services/project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupService } from '../../group/services/group.service';
import { UserService } from '../../user/services/user.service';
import { Project } from '../../shared/entities/project.entity';
import { Category } from '../../shared/entities/category.entity';
import { Group } from '../../shared/entities/group.entity';
import { User } from '../../shared/entities/user.entity';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useValue: {},
        },
        CategoryService,
        {
          provide: getRepositoryToken(Category),
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

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

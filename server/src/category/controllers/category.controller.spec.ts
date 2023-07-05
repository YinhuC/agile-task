import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../services/category.service';
import { ProjectService } from '../../project/services/project.service';
import { Project } from '../../project/project.entity';
import { Category } from '../category.entity';
import { GroupService } from '../../group/services/group.service';
import { Group } from '../../group/group.entity';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/user.entity';

describe('CategoryController', () => {
  let controller: CategoryController;

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
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

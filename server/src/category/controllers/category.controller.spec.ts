import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoryService } from '../services/category.service';
import { ProjectService } from '../../project/services/project.service';
import { GroupService } from '../../group/services/group.service';
import { UserService } from '../../user/services/user.service';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { Group as GroupEntity } from '../../shared/entities/group.entity';
import { Project as ProjectEntity } from '../../shared/entities/project.entity';
import { Category as CategoryEntity } from '../../shared/entities/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(ProjectEntity),
          useValue: {},
        },
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
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
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

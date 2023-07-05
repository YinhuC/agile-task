import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupService } from '../services/group.service';
import { Group } from '../group.entity';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/user.entity';

describe('GroupController', () => {
  let controller: GroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
      controllers: [GroupController],
    }).compile();

    controller = module.get<GroupController>(GroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupService } from '../services/group.service';
import { UserService } from '../../user/services/user.service';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { Group as GroupEntity } from '../../shared/entities/group.entity';

describe('GroupController', () => {
  let controller: GroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
      controllers: [GroupController],
    }).compile();

    controller = module.get<GroupController>(GroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

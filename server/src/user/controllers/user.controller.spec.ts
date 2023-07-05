import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { User as UserEntity } from '../../shared/entities/user.entity';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { UserService } from '../../user/services/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

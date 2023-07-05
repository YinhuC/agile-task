import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User as UserEntity } from '../../shared/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;

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
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

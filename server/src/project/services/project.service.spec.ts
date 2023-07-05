import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { Project } from '../../shared/entities/project.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupService } from '../../group/services/group.service';
import { Group } from '../../shared/entities/group.entity';
import { UserService } from '../../user/services/user.service';
import { User } from '../../shared/entities/user.entity';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

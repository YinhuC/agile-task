import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupService } from '../../group/services/group.service';
import { UserService } from '../../user/services/user.service';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { Group as GroupEntity } from '../../shared/entities/group.entity';
import { Project as ProjectEntity } from '../../shared/entities/project.entity';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(ProjectEntity),
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
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

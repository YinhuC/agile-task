import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupService } from '../services/group.service';
import { UserService } from '../../user/services/user.service';
import { User as UserEntity } from '../../shared/entities/user.entity';
import { Group as GroupEntity } from '../../shared/entities/group.entity';
import { User } from '../../shared/interfaces/user.interface';
import { Group } from '../../shared/interfaces/group.interface';
import { generateMockUser } from '../../shared/mock/user.mock';
import {
  generateMockGroup,
  generateMockGroups,
} from '../../shared/mock/group.mock';
import { CreateGroupDTO } from '../dto/create-group.dto';
import { GroupResponse } from '../utils/group.types';
import { UpdateGroupDto } from '../dto/update-group.dto';

describe('GroupController', () => {
  let controller: GroupController;
  let groupService: GroupService;

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
    groupService = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllGroups', () => {
    it('should return an array of groups', async () => {
      const user: User = generateMockUser(1);
      const groups: Group[] = generateMockGroups(3);

      jest.spyOn(groupService, 'getAllGroups').mockResolvedValue(groups);

      const result = await controller.getAllGroups(user);

      expect(result).toBe(groups);
      expect(groupService.getAllGroups).toHaveBeenCalledWith(user);
    });
  });

  describe('getGroupById', () => {
    it('should return a group by ID', async () => {
      const groupId = 1;
      const group: Group = generateMockGroup(1);

      jest.spyOn(groupService, 'getGroupById').mockResolvedValue(group);

      const result = await controller.getGroupById(groupId);

      expect(result).toBe(group);
      expect(groupService.getGroupById).toHaveBeenCalledWith(groupId);
    });
  });

  describe('createGroup', () => {
    it('should create a new group', async () => {
      const user: User = generateMockUser(1);
      const createGroupDto: CreateGroupDTO = { name: 'Group 1', emails: [] };
      const groupResponse: GroupResponse = {
        id: 1,
        name: 'Group 1',
        notFoundUsers: [],
      };

      jest.spyOn(groupService, 'createGroup').mockResolvedValue(groupResponse);

      const result = await controller.createGroup(user, createGroupDto);

      expect(result).toBe(groupResponse);
      expect(groupService.createGroup).toHaveBeenCalledWith(
        user,
        createGroupDto
      );
    });
  });

  describe('updateGroup', () => {
    it('should update an existing group', async () => {
      const groupId = 1;
      const updateGroupDto: UpdateGroupDto = {
        name: 'Group Updated',
        emails: [],
      };
      const groupResponse: GroupResponse = {
        id: 1,
        name: 'Group Updated',
        notFoundUsers: [],
      };

      jest.spyOn(groupService, 'updateGroup').mockResolvedValue(groupResponse);

      const result = await controller.updateGroup(groupId, updateGroupDto);

      expect(result).toBe(groupResponse);
      expect(groupService.updateGroup).toHaveBeenCalledWith(
        groupId,
        updateGroupDto
      );
    });
  });

  describe('deleteGroup', () => {
    it('should delete an existing group', async () => {
      const groupId = 1;
      const group: Group = { id: groupId, name: 'Group 1' };

      jest.spyOn(groupService, 'deleteGroup').mockResolvedValue(group);

      const result = await controller.deleteGroup(groupId);

      expect(result).toBe(group);
      expect(groupService.deleteGroup).toHaveBeenCalledWith(groupId);
    });
  });
});

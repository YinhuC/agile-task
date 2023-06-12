import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../group.entity';
import { CreateGroupDTO } from '../dto/create-group.dto';
import { User } from 'src/user/user.entity';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  async getAllGroups(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async getGroupById(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async getGroupWithOwner(id: number): Promise<Group> {
    const group = await this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.owner', 'users')
      .where('group.id = :id', { id })
      .getOne();
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async createGroup(
    createGroupDto: CreateGroupDTO,
    user: User
  ): Promise<Group> {
    const group = {
      ...createGroupDto,
      owner: user,
    };
    const newGroup = this.groupRepository.create(group);
    return this.groupRepository.save(newGroup);
  }

  async updateGroup(
    id: number,
    updateGroupDto: UpdateGroupDto
  ): Promise<Group> {
    const group = await this.getGroupById(id);
    Object.assign(group, updateGroupDto);
    return this.groupRepository.save(group);
  }

  async deleteGroup(id: number): Promise<void> {
    const group = await this.getGroupById(id);
    await this.groupRepository.remove(group);
  }

  async isOwner(user: Partial<User>, groupId: number): Promise<boolean> {
    const group = await this.getGroupWithOwner(groupId);
    return group.owner.id === user.id;
  }
}

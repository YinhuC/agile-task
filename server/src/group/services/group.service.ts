import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from '../group.entity';
import { CreateGroupDTO } from '../dto/create-group.dto';
import { User } from 'src/user/user.entity';

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
    return this.groupRepository.findOne({ where: { id } });
  }

  async getGroupWithOwner(id: number): Promise<Group> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.owner', 'users')
      .where('group.id = :id', { id })
      .getOne();
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

  async updateGroup(id: number, groupData: Group): Promise<Group> {
    const group = await this.getGroupById(id);
    Object.assign(group, groupData);
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

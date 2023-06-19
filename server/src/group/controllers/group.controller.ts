import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Group } from '../group.entity';
import { GroupService } from '../services/group.service';
import { OwnershipGuard } from '../guards/ownership.guard';
import { CreateGroupDTO } from '../dto/create-group.dto';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/user.entity';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { GroupMemberGuard } from '../guards/group-member.guard';
import { GroupResponse } from '../utils/group.types';

@UseGuards(AuthenticatedGuard)
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAllGroups(@AuthUser() user: User): Promise<Group[]> {
    return await this.groupService.getAllGroups(user);
  }

  @Get(':id')
  @UseGuards(GroupMemberGuard)
  async getGroupById(@Param('id') id: number): Promise<Group> {
    return await this.groupService.getGroupById(id);
  }

  @Post()
  async createGroup(
    @AuthUser() user: User,
    @Body() createGroupDto: CreateGroupDTO
  ): Promise<GroupResponse> {
    return await this.groupService.createGroup(user, createGroupDto);
  }

  @Put(':id')
  @UseGuards(OwnershipGuard)
  async updateGroup(
    @Param('id') id: number,
    @Body() updateGroupDto: UpdateGroupDto
  ): Promise<GroupResponse> {
    return await this.groupService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  @UseGuards(OwnershipGuard)
  async deleteGroup(@Param('id') id: number): Promise<void> {
    return await this.groupService.deleteGroup(id);
  }
}

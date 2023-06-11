import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Group } from '../group.entity';
import { GroupService } from '../services/group.service';
import { OwnershipGuard } from '../guards/ownership.guard';
import { CreateGroupDTO } from '../dto/create-group.dto';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/user.entity';
import { OwnershipInterceptor } from '../utils/ownership.interceptor';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getAllGroups(): Promise<Group[]> {
    return this.groupService.getAllGroups();
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async getGroupById(@Param('id') id: number): Promise<Group> {
    return this.groupService.getGroupById(id);
  }

  @Post()
  @UseGuards(AuthenticatedGuard)
  async createGroup(
    @AuthUser() user: User,
    @Body() createGroupDto: CreateGroupDTO
  ): Promise<Group> {
    return this.groupService.createGroup(createGroupDto, user);
  }

  @Put(':id')
  @UseGuards(AuthenticatedGuard, OwnershipGuard)
  async updateGroup(
    @Param('id') id: number,
    @Body() groupData: Group
  ): Promise<Group> {
    return this.groupService.updateGroup(id, groupData);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, OwnershipGuard)
  async deleteGroup(@Param('id') id: number): Promise<void> {
    return this.groupService.deleteGroup(id);
  }
}

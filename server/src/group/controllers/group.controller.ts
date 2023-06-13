import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Group } from '../group.entity';
import { GroupService } from '../services/group.service';
import { OwnershipGuard } from '../guards/ownership.guard';
import { CreateGroupDTO } from '../dto/create-group.dto';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/user.entity';
import { UpdateGroupDto } from '../dto/update-group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getAllGroups(@AuthUser() user: User): Promise<Group[]> {
    return await this.groupService.getAllGroups(user);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async getGroupById(
    @AuthUser() user: User,
    @Param('id') id: number
  ): Promise<Group> {
    return await this.groupService.getGroupById(user, id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard)
  async createGroup(
    @AuthUser() user: User,
    @Body() createGroupDto: CreateGroupDTO
  ): Promise<Group> {
    return await this.groupService.createGroup(user, createGroupDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthenticatedGuard, OwnershipGuard)
  async updateGroup(
    @AuthUser() user: User,
    @Param('id') id: number,
    @Body() updateGroupDto: UpdateGroupDto
  ): Promise<Group> {
    return await this.groupService.updateGroup(user, id, updateGroupDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, OwnershipGuard)
  async deleteGroup(@Param('id') id: number): Promise<void> {
    return await this.groupService.deleteGroup(id);
  }
}

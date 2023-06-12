import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user';
import { User } from '../user.entity';
import { AuthenticatedGuard } from 'src/auth/guards/auth.guard';
import { Request, Response } from 'express';
import { AuthUser } from '../decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  async findById(@Param('id') id: number): Promise<User> {
    return await this.userService.findUserById(id);
  }

  @Put()
  @UseGuards(AuthenticatedGuard)
  async update(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthenticatedGuard)
  async deleteAccount(
    @AuthUser() user: User,
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void> {
    await this.userService.deleteUser(user.id);

    req.logout((err) => {
      return err ? res.sendStatus(400) : res.sendStatus(200);
    });
  }
}

import {
  Body,
  Controller,
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

@UseGuards(AuthenticatedGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  async update(
    @AuthUser() user: User,
    @Body() updateUserDto: Partial<UpdateUserDto>
  ): Promise<User> {
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Delete()
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

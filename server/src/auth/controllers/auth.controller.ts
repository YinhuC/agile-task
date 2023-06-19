import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  Req,
  Res,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RegisterDto } from '../dto/register.dto';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { TokenInterceptor } from '../utils/token.interceptor';
import { AuthenticatedGuard } from '../guards/auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(TokenInterceptor)
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  async login(@AuthUser() user: User): Promise<User> {
    return user;
  }

  @Get('user')
  @UseGuards(AuthenticatedGuard)
  async user(@AuthUser() user: User): Promise<User> {
    return user;
  }

  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      return err ? res.sendStatus(400) : res.sendStatus(200);
    });
  }
}

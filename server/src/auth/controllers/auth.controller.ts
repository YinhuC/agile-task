import {
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
  UsePipes,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RegisterDto } from '../dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { TokenInterceptor } from '../utils/token.interceptor';
import { SessionAuthGuard } from '../guards/session-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async create(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(TokenInterceptor)
  async login(@AuthUser() user: User): Promise<string> {
    return await this.authService.generateToken(user);
  }

  @Get('user')
  @UseGuards(SessionAuthGuard, JwtAuthGuard)
  async user(@AuthUser() user: User): Promise<User> {
    return user;
  }
}

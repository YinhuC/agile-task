import {
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
  UsePipes,
  Get,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RegisterDto } from '../dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthUser } from 'src/user/decorators/user.decorator';
import { TokenInterceptor } from '../utils/token.interceptor';
import { SessionAuthGuard } from '../guards/session-auth.guard';
import { AuthenticatedGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @UseInterceptors(TokenInterceptor)
  async create(@Body() registerDto: RegisterDto): Promise<User> {
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
  @UseGuards(AuthenticatedGuard, SessionAuthGuard, JwtAuthGuard)
  async user(@AuthUser() user: User): Promise<User> {
    return user;
  }
}

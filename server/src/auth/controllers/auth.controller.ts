import {
  Controller,
  Post,
  UseGuards,
  Request,
  ValidationPipe,
  Body,
  UsePipes,
  Get,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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
  async login(@Body() loginDto: LoginDto): Promise<string> {
    console.log('tesatastdafsdfsfadfasdf');
    const user = await this.authService.login(loginDto);
    if (user) return await this.authService.generateToken(user);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async user(@Request() req): Promise<User> {
    return req.user;
  }
}

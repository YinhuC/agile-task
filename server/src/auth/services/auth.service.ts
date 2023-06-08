import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.userService.create(registerDto);
    delete user.password;

    return user;
  }

  async login(email: string, password: string): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findUserByEmail(email);
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`
      );
    }

    if (!(await user.checkPassword(password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`
      );
    }
    delete user.password;

    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findUserByEmail(payload.email);
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`
      );
    }
    delete user.password;

    return user;
  }

  async generateToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }
}

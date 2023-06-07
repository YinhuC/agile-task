import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { User } from 'src/user/user.entity';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const user = await this.userService.create(registerDto);
    delete user.password;

    return user;
  }

  async login(loginDto: LoginDto): Promise<User> {
    let user: User;
    const { email, password } = loginDto;

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
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/user.entity';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { email } = registerDto;
    let existingUser: User;
    try {
      existingUser = await this.userService.findUserByEmail(email);
    } catch (err) {}
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
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

    if (!(await this.userService.comparePassword(user, password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`
      );
    }

    return user;
  }
}

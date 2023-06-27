import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../user/user.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error | null, id?: User) => void
  ): void {
    done(null, user);
  }

  async deserializeUser(
    user: User,
    done: (err: Error | null, payload?: unknown) => void
  ): Promise<void> {
    const userResult = await this.userService.findUserByEmail(user.email);
    return userResult ? done(null, user) : done(null, null);
  }
}

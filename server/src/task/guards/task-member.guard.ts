import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '../../shared/entities/user.entity';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskMemberGuard implements CanActivate {
  constructor(private taskService: TaskService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user: Partial<User> = request.user;
    const isMember = await this.taskService.isMember(
      user,
      parseInt(request.params.id)
    );
    if (!isMember) {
      throw new ForbiddenException('You have no access to this task');
    }
    return isMember;
  }
}

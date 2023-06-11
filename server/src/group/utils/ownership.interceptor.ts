import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/user/user.entity';
import { Group } from '../group.entity';

@Injectable()
export class OwnershipInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Group> {
    const request = context.switchToHttp().getRequest();
    const owner: User = request.user;

    return next.handle().pipe(
      map((group: Group) => {
        group.owner = owner;
        return group;
      })
    );
  }
}

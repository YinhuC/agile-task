import { Group } from '../../shared/entities/group.entity';

export type GroupResponse = Group & {
  notFoundUsers: string[];
};

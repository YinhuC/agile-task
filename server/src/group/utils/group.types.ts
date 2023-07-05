import { Group } from '../../shared/interfaces/group.interface';

export type GroupResponse = Group & {
  notFoundUsers: string[];
};

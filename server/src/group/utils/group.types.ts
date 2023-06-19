import { Group } from '../group.entity';

export type GroupResponse = Group & {
  notFoundUsers: string[];
};

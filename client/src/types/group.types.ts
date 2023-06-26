import { Project } from './project.types';
import { User } from './user.types';

export type CreateGroupParams = {
  name: string;
  users?: string[];
};

export type UpdateGroupParams = {
  id: number;
  name?: string;
  users?: string[];
  owner?: User;
};

export type Group = {
  id: number;
  name: string;
  createdAt: string;
  owner?: User;
  projects?: Project[];
  users?: User[];
};

export type GroupResponse = Group & {
  users: User[];
  notFoundUsers: string[];
};

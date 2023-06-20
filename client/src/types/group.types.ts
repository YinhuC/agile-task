import { Project } from './project.types';
import { User } from './user.types';

export type CreateGroupParams = {
  name: string;
  users?: string[];
};

export type UpdateGroupParams = {
  name?: string;
  users?: string[];
};

export type Group = {
  id: number;
  name: string;
  createdAt: string;
  owner?: User;
};

export type GroupResponse = Group & {
  users: User[];
  notFoundUsers: string[];
};

export type GroupWithUsers = Group & {
  users: User[];
};

export type GroupWithProjects = Group & {
  projects: Project[];
};

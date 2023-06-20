import { Group } from './group.types';

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  authMethod: string;
  createdAt: string;
  updatedAt: string;
};

export type UserWithGroups = User & {
  Groups: Group[];
};

export type UpdateUserParams = {
  email?: string;
  firstName?: string;
  lastName?: string;
  authMethod?: string;
  password?: string;
};

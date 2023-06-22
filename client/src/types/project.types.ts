import { Category } from './category.types';
import { Group } from './group.types';

export type GetProjectsParams = {
  groupId: number;
};

export type CreateProjectParams = {
  name: string;
  groupId: number;
};

export type UpdateProjectParams = {
  id: string;
  name?: string;
  description?: string;
};

export type Project = {
  id: number;
  name: string;
  description: string;
  group?: Group;
  createdAt: string;
  updatedAt: string;
  categories?: Category[];
};

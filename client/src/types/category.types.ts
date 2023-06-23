import { Project } from './project.types';
import { Task } from './task.types';

export type GetCategoriesParams = {
  projectId: number;
};

export type CreateCategoryParams = {
  name: string;
  projectId: number;
};

export type UpdateCategoryParams = {
  id: string;
  name?: string;
  index?: number;
};

export type Category = {
  id: number;
  name: string;
  index: number;
  project?: Project;
  createdAt: string;
  tasks?: Task[];
};

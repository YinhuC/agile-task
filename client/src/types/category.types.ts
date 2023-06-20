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
  name: string;
};

export type Category = {
  id: number;
  name: string;
  project?: Project;
  createdAt: string;
};

export type CategoryWithTasks = Category & {
  tasks: Task[];
};

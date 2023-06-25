import { Category } from './category.types';
import { User } from './user.types';

export type GetTasksParams = {
  categoryId: number;
};

export type CreateTaskParams = {
  name: string;
  categoryId: number;
};

export type UpdateTaskParams = {
  id: number;
  name?: string;
  index?: number;
  categoryId?: number;
};

export type UpdateTaskOrderParams = {
  categoryId: number;
  id: number;
  index: number;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  index: number;
  category?: Category;
  createdAt: string;
  user?: User;
};

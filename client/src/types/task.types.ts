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
  name: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  category?: Category;
  createdAt: string;
  user?: User;
};

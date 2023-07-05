import { Category } from './category.interface';
import { User } from './user.interface';

export interface Task {
  id: number;
  index: number;
  name: string;
  description: string;
  category?: Category;
  createdAt?: number;
  user?: User;
}

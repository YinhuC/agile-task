import { Category } from './category.interface';
import { Group } from './group.interface';

export interface Project {
  id: number;
  name: string;
  description: string;
  group?: Group;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: Category[];
}

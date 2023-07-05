import { Project } from './project.interface';
import { Task } from './task.interface';

export interface Category {
  id: number;
  index: number;
  name: string;
  project?: Project;
  createdAt?: number;
  tasks?: Task[];
}

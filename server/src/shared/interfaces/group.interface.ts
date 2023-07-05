import { Project } from './project.interface';
import { User } from './user.interface';

export interface Group {
  id: number;
  name: string;
  users?: User[];
  owner?: User;
  projects?: Project[];
  createdAt?: number;
}

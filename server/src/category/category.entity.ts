import { Project } from '../project/project.entity';
import { Task } from '../task/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project: Project;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}

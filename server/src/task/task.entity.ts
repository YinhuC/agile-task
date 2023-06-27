import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Category, (category) => category.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  user: User;
}

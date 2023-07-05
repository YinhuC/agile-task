import { faker } from '@faker-js/faker';
import { Task } from '../interfaces/task.interface';
import { CreateTaskDto } from '../../task/dto/create-task.dto';

export const generateMockTask = (i: number): Task => ({
  id: i,
  index: i,
  name: faker.lorem.words({ min: 2, max: 5 }),
  description: faker.lorem.lines(2),
});

export const generateMockTasks = (count: number): Task[] => {
  const tasks: Task[] = [];
  for (let i = 0; i < count; i++) {
    tasks.push(generateMockTask(i));
  }
  return tasks;
};

export const generateMockTaskDto = (categoryId: number): CreateTaskDto => ({
  name: faker.lorem.words({ min: 2, max: 5 }),
  description: faker.lorem.lines(2),
  categoryId,
});

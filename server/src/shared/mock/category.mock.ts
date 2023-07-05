import { faker } from '@faker-js/faker';
import { Category } from '../interfaces/category.interface';

export const generateMockCategory = (i: number): Category => ({
  id: i,
  index: i,
  name: faker.lorem.words({ min: 2, max: 5 }),
});

export const generateMockCategorys = (count: number): Category[] => {
  const cateogories: Category[] = [];
  for (let i = 0; i < count; i++) {
    cateogories.push(generateMockCategory(i));
  }
  return cateogories;
};

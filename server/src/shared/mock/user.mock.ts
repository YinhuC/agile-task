import { faker } from '@faker-js/faker';
import { User } from '../interfaces/user.interface';

export const generateMockUser = (i: number): User => ({
  id: i,
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: faker.internet.password(),
});

export const generateMockUsers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push(generateMockUser(i));
  }
  return users;
};

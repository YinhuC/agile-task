import { faker } from '@faker-js/faker';
import { User } from '../interfaces/user.interface';
import { RegisterDto } from '../../auth/dto/register.dto';

export const generateMockUser = (
  i: number,
  email?: string,
  firstname?: string,
  lastname?: string,
  password?: string
): User => ({
  id: i,
  email: email ? email : faker.internet.email(),
  firstname: firstname ? firstname : faker.person.firstName(),
  lastname: lastname ? lastname : faker.person.lastName(),
  password: password ? password : faker.internet.password(),
});

export const generateMockUsers = (count: number): User[] => {
  const users: User[] = [];
  for (let i = 0; i < count; i++) {
    users.push(generateMockUser(i));
  }
  return users;
};

export const generateMockUserDto = (
  email?: string,
  firstname?: string,
  lastname?: string,
  password?: string
): RegisterDto => ({
  email: email ? email : faker.internet.email(),
  firstname: firstname ? firstname : faker.person.firstName(),
  lastname: lastname ? lastname : faker.person.lastName(),
  password: password ? password : faker.internet.password(),
});

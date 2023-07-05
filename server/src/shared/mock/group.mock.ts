import { faker } from '@faker-js/faker';
import { Group } from '../interfaces/group.interface';

export const generateMockGroup = (i: number): Group => ({
  id: i,
  name: faker.company.name(),
});

export const generateMockGroups = (count: number): Group[] => {
  const groups: Group[] = [];
  for (let i = 0; i < count; i++) {
    groups.push(generateMockGroup(i));
  }
  return groups;
};

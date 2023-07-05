import { faker } from '@faker-js/faker';
import { Group } from '../interfaces/group.interface';
import { CreateGroupDTO } from '../../group/dto/create-group.dto';

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

export const generateMockGroupDto = (): CreateGroupDTO => ({
  name: faker.company.name(),
});

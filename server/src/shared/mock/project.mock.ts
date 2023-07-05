import { faker } from '@faker-js/faker';
import { Project } from '../interfaces/project.interface';
import { Group } from '../interfaces/group.interface';
import { CreateProjectDto } from '../../project/dto/create-project.dto';

export const generateMockProject = (i: number, group?: Group): Project => ({
  id: i,
  name: faker.lorem.words({ min: 2, max: 5 }),
  description: faker.lorem.lines(2),
  group: group,
});

export const generateMockProjects = (
  count: number,
  group?: Group
): Project[] => {
  const projects: Project[] = [];
  for (let i = 0; i < count; i++) {
    projects.push(generateMockProject(i, group));
  }
  return projects;
};

export const generateMockProjectDto = (groupId: number): CreateProjectDto => ({
  name: faker.lorem.words({ min: 2, max: 5 }),
  description: faker.lorem.lines(2),
  groupId,
});

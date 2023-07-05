import { faker } from '@faker-js/faker';
import { Project } from '../interfaces/project.interface';

export const generateMockProject = (i: number): Project => ({
  id: i,
  name: faker.lorem.words({ min: 2, max: 5 }),
  description: faker.lorem.lines(2),
});

export const generateMockProjects = (count: number): Project[] => {
  const projects: Project[] = [];
  for (let i = 0; i < count; i++) {
    projects.push(generateMockProject(i));
  }
  return projects;
};

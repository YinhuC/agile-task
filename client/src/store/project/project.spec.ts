import {
  CreateProjectParams,
  GetProjectsParams,
  Project,
  UpdateProjectParams,
} from '../../types/project.types';
import { store } from '..';
import {
  fetchAllProjectsThunk,
  fetchProjectThunk,
  createProjectThunk,
  updateProjectThunk,
  deleteProjectThunk,
} from './project.thunks';

jest.mock('../../api', () => ({
  project: {
    getAllProjects: jest.fn(),
    getProject: jest.fn(),
    createProject: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
  },
}));

describe('Project Thunks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches createProjectThunk correctly', async () => {
    const params: CreateProjectParams = { name: 'New Project', groupId: 1 };
    const createProjectMock = jest
      .fn()
      .mockResolvedValue({ data: { id: 1, ...params } });
    const projectModule = require('../../api').project;
    projectModule.createProject.mockImplementation(createProjectMock);

    await store.dispatch(createProjectThunk(params));

    expect(createProjectMock).toHaveBeenCalledWith(params);
    expect(store.getState().projects).toEqual({
      projects: [{ id: 1, ...params }],
    });
  });

  it('dispatches updateProjectThunk correctly', async () => {
    const projectId = 1;
    const updatedProject: UpdateProjectParams = {
      id: projectId,
      name: 'Updated Project',
    };

    const updateProjectMock = jest
      .fn()
      .mockResolvedValue({ data: updatedProject });

    const projectModule = require('../../api').project;
    projectModule.updateProject.mockImplementation(updateProjectMock);

    await store.dispatch(updateProjectThunk(updatedProject));

    expect(updateProjectMock).toHaveBeenCalledWith(updatedProject);
    expect(store.getState().projects).toEqual({
      projects: [updatedProject],
    });
  });

  it('dispatches fetchAllProjectsThunk correctly', async () => {
    const mockProjects: Project[] = [
      {
        id: 1,
        name: 'Project 1',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      },
    ];
    const getProjectsMock = jest.fn().mockResolvedValue({ data: mockProjects });
    const projectModule = require('../../api').project;
    projectModule.getAllProjects.mockImplementation(getProjectsMock);

    const params: GetProjectsParams = { groupId: 1 };

    await store.dispatch(fetchAllProjectsThunk(params));

    expect(getProjectsMock).toHaveBeenCalledWith(params);
    expect(store.getState().projects).toEqual({ projects: mockProjects });
  });

  it('dispatches fetchProjectThunk correctly', async () => {
    const projectId = 1;
    const mockProject: Project = {
      id: 1,
      name: 'Project 1',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    };
    const getProjectMock = jest.fn().mockResolvedValue({ data: mockProject });
    const projectModule = require('../../api').project;
    projectModule.getProject.mockImplementation(getProjectMock);

    await store.dispatch(fetchProjectThunk(projectId.toString()));

    expect(getProjectMock).toHaveBeenCalledWith(projectId.toString());
    expect(store.getState().projects).toEqual({ projects: [mockProject] });
  });

  it('dispatches deleteProjectThunk correctly', async () => {
    const projectId = 1;
    const deleteProjectMock = jest
      .fn()
      .mockResolvedValue({ data: { id: projectId } });
    const projectModule = require('../../api').project;
    projectModule.deleteProject.mockImplementation(deleteProjectMock);

    await store.dispatch(deleteProjectThunk(projectId.toString()));

    expect(deleteProjectMock).toHaveBeenCalledWith(projectId.toString());
    expect(store.getState().projects).toEqual({
      projects: [],
    });
  });
});

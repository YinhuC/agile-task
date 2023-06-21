import {
  CreateProjectParams,
  GetProjectsParams,
  Project,
  UpdateProjectParams,
} from '../types/project.types';
import { axiosClient } from './client.api';

export const getAllProjects = (data: GetProjectsParams) =>
  axiosClient.post<Project[]>('/projects/all', data);

export const createProject = (data: CreateProjectParams) =>
  axiosClient.post<Project>('/projects', data);

export const updateProject = (data: UpdateProjectParams, id: string) =>
  axiosClient.put<Project>(`/projects/${id}`, data);

export const deleteProject = (id: string) =>
  axiosClient.delete(`/projects/${id}`);

import {
  CreateProjectParams,
  GetProjectsParams,
  UpdateProjectParams,
} from '../types/project.types';
import { axiosClient } from './client.api';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

export const getAllProjects = (data: GetProjectsParams) =>
  axiosClient.post('/projects/all', data, config);

export const createProject = (data: CreateProjectParams) =>
  axiosClient.post('/projects', data, config);

export const updateProject = (data: UpdateProjectParams, id: string) =>
  axiosClient.put(`/projects/${id}`, data, config);

export const deleteProject = (id: string) =>
  axiosClient.delete(`/projects/${id}`, config);

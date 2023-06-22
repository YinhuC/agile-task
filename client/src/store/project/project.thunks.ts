import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import {
  CreateProjectParams,
  GetProjectsParams,
  Project,
  UpdateProjectParams,
} from '../../types/project.types';

export interface FetchProjectsPayload {
  data: Project[];
}

export const fetchProjectsThunk = createAsyncThunk<
  FetchProjectsPayload,
  GetProjectsParams
>('projects/fetch', (params: GetProjectsParams) => {
  return API.project.getAllProjects(params);
});

export const createProjectThunk = createAsyncThunk(
  'projects/create',
  (params: CreateProjectParams) => API.project.createProject(params)
);

export const updateProjectThunk = createAsyncThunk(
  'projects/update',
  (params: UpdateProjectParams) => API.project.updateProject(params)
);

export const deleteProjectThunk = createAsyncThunk(
  'projects/delete',
  (id: string) => API.project.deleteProject(id)
);

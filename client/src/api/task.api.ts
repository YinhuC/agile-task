import {
  CreateTaskParams,
  GetTasksParams,
  Task,
  UpdateTaskParams,
} from '../types/task.types';
import { axiosClient } from './client.api';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

export const getAllTasks = (data: GetTasksParams) =>
  axiosClient.post<Task[]>('/tasks/all', data, config);

export const createTask = (data: CreateTaskParams) =>
  axiosClient.post<Task>('/tasks', data, config);

export const updateTask = (data: UpdateTaskParams, id: string) =>
  axiosClient.put<Task>(`/tasks/${id}`, data, config);

export const deleteTask = (id: string) =>
  axiosClient.delete(`/tasks/${id}`, config);

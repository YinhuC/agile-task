import {
  CreateTaskParams,
  GetTasksParams,
  Task,
  UpdateTaskParams,
} from '../types/task.types';
import { axiosClient } from './client.api';

export const getAllTasks = (data: GetTasksParams) =>
  axiosClient.post<Task[]>('/tasks/all', data);

export const createTask = (data: CreateTaskParams) =>
  axiosClient.post<Task>('/tasks', data);

export const updateTask = (data: UpdateTaskParams, id: string) =>
  axiosClient.put<Task>(`/tasks/${id}`, data);

export const deleteTask = (id: string) => axiosClient.delete(`/tasks/${id}`);

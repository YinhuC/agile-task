import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import {
  CreateTaskParams,
  GetTasksParams,
  UpdateTaskParams,
} from '../../types/task.types';

export const fetchTasksThunk = createAsyncThunk(
  'tasks/fetch',
  (params: GetTasksParams) => {
    return API.task.getAllTasks(params);
  }
);
export const createTaskThunk = createAsyncThunk(
  'tasks/create',
  (params: CreateTaskParams) => API.task.createTask(params)
);

export const updateTaskThunk = createAsyncThunk(
  'tasks/update',
  (params: UpdateTaskParams) => API.task.updateTask(params)
);

export const deleteTaskThunk = createAsyncThunk('tasks/delete', (id: string) =>
  API.task.deleteTask(id)
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import {
  CreateTaskParams,
  GetTasksParams,
  Task,
  UpdateTaskOrderParams,
  UpdateTaskParams,
} from '../../types/task.types';

export interface FetchAllTasksPayload {
  data: Task[];
}

export const fetchAllTasksThunk = createAsyncThunk<
  FetchAllTasksPayload,
  GetTasksParams
>('tasks/fetch/all', (params: GetTasksParams) => {
  return API.task.getAllTasks(params);
});
export const createTaskThunk = createAsyncThunk(
  'tasks/create',
  (params: CreateTaskParams) => API.task.createTask(params)
);

export const updateTaskThunk = createAsyncThunk(
  'tasks/update',
  (params: UpdateTaskParams) => API.task.updateTask(params)
);

export const updateTaskOrderThunk = createAsyncThunk(
  'tasks/update/order',
  async (
    { oldCategoryId, newCategoryId, ...params }: UpdateTaskOrderParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await API.task.updateTask({
        ...params,
        categoryId: newCategoryId,
      });
      if (response.status === 200) {
        API.task.getAllTasks({ categoryId: oldCategoryId });
        return API.task.getAllTasks({ categoryId: newCategoryId });
      }
    } catch (error) {}
    return rejectWithValue('An error occurred while updating the category.');
  }
);

export const deleteTaskThunk = createAsyncThunk('tasks/delete', (id: string) =>
  API.task.deleteTask(id)
);

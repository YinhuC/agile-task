import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types/task.types';
import {
  createTaskThunk,
  deleteTaskThunk,
  fetchAllTasksThunk,
  updateTaskOrderThunk,
  updateTaskThunk,
} from './task.thunks';
import { sortByIndex } from '../../utils/sort.utils';

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },

    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    updateAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = sortByIndex(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasksThunk.fulfilled, (state, action) => {
      const fetchedTasks = action.payload.data;

      fetchedTasks.forEach((fetchedTask) => {
        const existingTaskIndex = state.tasks.findIndex(
          (task) => task.id === fetchedTask.id
        );

        if (existingTaskIndex !== -1) {
          state.tasks[existingTaskIndex] = fetchedTask;
        } else {
          state.tasks.push(fetchedTask);
        }
      });

      state.tasks = sortByIndex(state.tasks);
    });

    builder.addCase(createTaskThunk.fulfilled, (state, action) => {
      state.tasks.unshift(action.payload.data);
    });

    builder.addCase(updateTaskThunk.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.data.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload.data;
      }
    });

    builder.addCase(updateTaskOrderThunk.fulfilled, (state, action) => {
      const fetchedTasks = action.payload.data;

      fetchedTasks.forEach((fetchedTask) => {
        const existingTaskIndex = state.tasks.findIndex(
          (task) => task.id === fetchedTask.id
        );

        if (existingTaskIndex !== -1) {
          state.tasks[existingTaskIndex] = fetchedTask;
        } else {
          state.tasks.push(fetchedTask);
        }
      });

      state.tasks = sortByIndex(state.tasks);
    });

    builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload.data.id
      );
    });
  },
});

export const { addTask, removeTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;

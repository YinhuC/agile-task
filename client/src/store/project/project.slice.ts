import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Project } from '../../types/project.types';
import {
  createProjectThunk,
  deleteProjectThunk,
  fetchProjectsThunk,
  updateProjectThunk,
} from './project.thunks';

export interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },

    removeProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },

    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsThunk.fulfilled, (state, action) => {
      state.projects = action.payload.data;
    });

    builder.addCase(createProjectThunk.fulfilled, (state, action) => {
      state.projects.unshift(action.payload.data);
    });

    builder.addCase(updateProjectThunk.fulfilled, (state, action) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.data.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload.data;
      }
    });

    builder.addCase(deleteProjectThunk.fulfilled, (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.data.id
      );
    });
  },
});

export const { addProject, removeProject, updateProject } =
  projectSlice.actions;

export default projectSlice.reducer;

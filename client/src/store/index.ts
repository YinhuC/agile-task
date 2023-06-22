import { configureStore } from '@reduxjs/toolkit';
import groups from './group/group.slice';
import projects from './project/project.slice';
import categories from './category/category.slice';
import tasks from './task/task.slice';

export const store = configureStore({
  reducer: {
    groups,
    projects,
    categories,
    tasks,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

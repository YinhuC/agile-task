import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './group/groupSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

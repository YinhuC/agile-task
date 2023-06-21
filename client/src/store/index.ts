import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './group/group.reducer';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

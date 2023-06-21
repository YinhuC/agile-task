import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import { UpdateUserParams } from '../../types/user.types';

export const updateUserThunk = createAsyncThunk(
  'users/update',
  (params: UpdateUserParams) => API.user.updateUser(params)
);

export const deleteUserThunk = createAsyncThunk('users/delete', () =>
  API.user.deleteUser()
);

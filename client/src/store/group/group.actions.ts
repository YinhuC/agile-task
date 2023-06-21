import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import { CreateGroupParams } from '../../types/group.types';

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
  return API.group.getGroups();
});

export const createGroupThunk = createAsyncThunk(
  'groups/create',
  (params: CreateGroupParams) => API.group.createGroup(params)
);

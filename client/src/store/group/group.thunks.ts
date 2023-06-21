import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import { CreateGroupParams, UpdateGroupParams } from '../../types/group.types';

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
  return API.group.getGroups();
});

export const createGroupThunk = createAsyncThunk(
  'groups/create',
  (params: CreateGroupParams) => API.group.createGroup(params)
);

export const updateGroupThunk = createAsyncThunk(
  'groups/update',
  (params: UpdateGroupParams) => API.group.updateGroup(params)
);

export const deleteGroupThunk = createAsyncThunk(
  'groups/delete',
  (id: string) => API.group.deleteGroup(id)
);

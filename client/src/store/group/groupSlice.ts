import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateGroupParams, Group } from '../../types/group.types';
import API from '../../api';

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', () => {
  return API.group.getGroups();
});

export const createGroupThunk = createAsyncThunk(
  'groups/create',
  (params: CreateGroupParams) => API.group.createGroup(params)
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log(`addGroup reducer: Adding ${action.payload.id} to state`);
      state.groups.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.groups = action.payload.data;
      console.log(state.groups);
    });
  },
});

export const { addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;

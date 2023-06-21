import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Group } from '../../types/group.types';
import { fetchGroupsThunk } from './group.actions';

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
    });
  },
});

export const { addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;

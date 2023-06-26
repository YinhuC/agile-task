import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Group } from '../../types/group.types';
import {
  createGroupThunk,
  deleteGroupThunk,
  fetchAllGroupsThunk,
  updateGroupThunk,
} from './group.thunks';
import { sortById } from '../../utils/sort.utils';

export interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.unshift(action.payload);
    },

    removeGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },

    updateGroup: (state, action: PayloadAction<Group>) => {
      const index = state.groups.findIndex(
        (group) => group.id === action.payload.id
      );
      if (index !== -1) {
        state.groups[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllGroupsThunk.fulfilled, (state, action) => {
      state.groups = sortById(action.payload.data);
    });

    builder.addCase(createGroupThunk.fulfilled, (state, action) => {
      state.groups.unshift(action.payload.data);
      state.groups = sortById(state.groups);
    });

    builder.addCase(updateGroupThunk.fulfilled, (state, action) => {
      const index = state.groups.findIndex(
        (group) => group.id === action.payload.data.id
      );
      if (index !== -1) {
        state.groups[index] = action.payload.data;
      }
    });

    builder.addCase(deleteGroupThunk.fulfilled, (state, action) => {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload.data.id
      );
    });
  },
});
export const { addGroup, removeGroup, updateGroup } = groupSlice.actions;

export default groupSlice.reducer;

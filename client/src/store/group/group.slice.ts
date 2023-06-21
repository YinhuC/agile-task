import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Group } from '../../types/group.types';
import {
  createGroupThunk,
  deleteGroupThunk,
  fetchGroupsThunk,
  updateGroupThunk,
} from './group.thunks';

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
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
    });

    builder.addCase(createGroupThunk.fulfilled, (state, action) => {
      state.groups.unshift(action.payload.data);
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

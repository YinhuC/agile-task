import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Group } from '../../types/group.types';
import { fetchGroupsThunk } from './group.actions';

export interface GroupState {
  groups: Group[];
  isLoading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  isLoading: false,
  error: null,
};

export const groupsSlice = createSlice({
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
    builder.addCase(fetchGroupsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.groups = action.payload.data;
    });

    builder.addCase(fetchGroupsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Failed to fetch groups.';
    });
  },
});

export const { addGroup, removeGroup, updateGroup } = groupsSlice.actions;

export default groupsSlice.reducer;

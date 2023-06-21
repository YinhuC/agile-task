import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types/category.types';
import {
  createCategoryThunk,
  deleteCategoryThunk,
  fetchCategoriesThunk,
  updateCategoryThunk,
} from './category.actions';

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.unshift(action.payload);
    },

    removeCategory: (state, action: PayloadAction<number>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },

    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload.data;
    });

    builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
      state.categories.unshift(action.payload.data);
    });

    builder.addCase(updateCategoryThunk.fulfilled, (state, action) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.data.id
      );
      if (index !== -1) {
        state.categories[index] = action.payload.data;
      }
    });

    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.data.id
      );
    });
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;

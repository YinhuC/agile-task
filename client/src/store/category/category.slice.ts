import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types/category.types';
import {
  createCategoryThunk,
  deleteCategoryThunk,
  fetchAllCategoriesThunk,
  updateCategoryOrderThunk,
  updateCategoryThunk,
} from './category.thunks';

export interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
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

    updateAllCategories: (state, action: PayloadAction<Category[]>) => {
      const sortedCategories = action.payload.slice().sort((a, b) => {
        return a.index - b.index;
      });
      state.categories = sortedCategories;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
      const sortedCategories = action.payload.data.slice().sort((a, b) => {
        return a.index - b.index;
      });
      state.categories = sortedCategories;
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

    builder.addCase(updateCategoryOrderThunk.fulfilled, (state, action) => {
      const sortedCategories = action.payload.data.slice().sort((a, b) => {
        return a.index - b.index;
      });
      state.categories = sortedCategories;
    });

    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.data.id
      );
    });
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categorySlice.actions;

export default categorySlice.reducer;

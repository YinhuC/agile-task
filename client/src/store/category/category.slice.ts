import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types/category.types';
import {
  createCategoryThunk,
  deleteCategoryThunk,
  fetchAllCategoriesThunk,
  updateCategoryOrderThunk,
  updateCategoryThunk,
} from './category.thunks';
import { sortByIndex } from '../../utils/sort.utils';

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
      state.categories = sortByIndex(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategoriesThunk.fulfilled, (state, action) => {
      state.categories = sortByIndex(action.payload.data);
    });

    builder.addCase(createCategoryThunk.fulfilled, (state, action) => {
      state.categories.push(action.payload.data);
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
      state.categories = sortByIndex(action.payload.data);
    });

    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.data.id
      );
    });
  },
});

export const {
  addCategory,
  removeCategory,
  updateCategory,
  updateAllCategories,
} = categorySlice.actions;

export default categorySlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import {
  CreateCategoryParams,
  GetCategoriesParams,
  UpdateCategoryParams,
} from '../../types/category.types';

export const fetchCateogoriesThunk = createAsyncThunk(
  'categories/fetch',
  (params: GetCategoriesParams) => {
    return API.category.getAllCategories(params);
  }
);
export const createCategoryThunk = createAsyncThunk(
  'categories/create',
  (params: CreateCategoryParams) => API.category.createCategory(params)
);

export const updateCategoryThunk = createAsyncThunk(
  'categories/update',
  (params: UpdateCategoryParams) => API.category.updateCategory(params)
);

export const deleteCategoryThunk = createAsyncThunk(
  'categories/delete',
  (id: string) => API.category.deleteCategory(id)
);

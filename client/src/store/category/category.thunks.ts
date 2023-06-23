import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';
import {
  CreateCategoryParams,
  GetCategoriesParams,
  UpdateCategoryOrderParams,
  UpdateCategoryParams,
} from '../../types/category.types';

export const fetchAllCategoriesThunk = createAsyncThunk(
  'categories/fetch/all',
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

export const updateCategoryOrderThunk = createAsyncThunk(
  'categories/update/order',
  async (
    { projectId, ...params }: UpdateCategoryOrderParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await API.category.updateCategory(params);
      if (response.status === 200) {
        const categoires = API.category.getAllCategories({ projectId });
        return categoires;
      }
    } catch (error) {}
    return rejectWithValue('An error occurred while updating the category.');
  }
);

export const deleteCategoryThunk = createAsyncThunk(
  'categories/delete',
  (id: string) => API.category.deleteCategory(id)
);

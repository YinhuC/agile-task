import {
  Category,
  CreateCategoryParams,
  GetCategoriesParams,
  UpdateCategoryParams,
} from '../types/category.types';
import { axiosClient } from './client.api';

export const getAllCategories = (data: GetCategoriesParams) =>
  axiosClient.post<Category[]>('/categories/all', data);

export const createCategory = (data: CreateCategoryParams) =>
  axiosClient.post<Category>('/categories', data);

export const updateCategory = (data: UpdateCategoryParams, id: string) =>
  axiosClient.put<Category>(`/categories/${id}`, data);

export const deleteCategory = (id: string) =>
  axiosClient.delete(`/categories/${id}`);

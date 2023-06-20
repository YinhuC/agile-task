import {
  Category,
  CreateCategoryParams,
  GetCategoriesParams,
  UpdateCategoryParams,
} from '../types/category.types';
import { axiosClient } from './client.api';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

export const getAllCategories = (data: GetCategoriesParams) =>
  axiosClient.post<Category[]>('/categories/all', data, config);

export const createCategory = (data: CreateCategoryParams) =>
  axiosClient.post<Category>('/categories', data, config);

export const updateCategory = (data: UpdateCategoryParams, id: string) =>
  axiosClient.put<Category>(`/categories/${id}`, data, config);

export const deleteCategory = (id: string) =>
  axiosClient.delete(`/categories/${id}`, config);

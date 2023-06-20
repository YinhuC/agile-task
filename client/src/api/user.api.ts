import { UpdateUserParams, User } from '../types/user.types';
import { axiosClient } from './client.api';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

export const updateUser = (data: UpdateUserParams) =>
  axiosClient.put<User>('/users', data, config);

export const deleteUser = () => axiosClient.delete(`/users`, config);

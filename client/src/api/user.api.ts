import { UpdateUserParams, User } from '../types/user.types';
import { axiosClient } from './client.api';

export const updateUser = (data: UpdateUserParams) =>
  axiosClient.put<User>('/users', data);

export const deleteUser = () => axiosClient.delete(`/users`);

import { LoginParams, RegisterParams } from '../types/auth.types';
import { User } from '../types/user.types';
import { axiosClient } from './client.api';

export const postAuthRegister = (data: RegisterParams) =>
  axiosClient.post<User>('/auth/register', data);

export const postAuthLogin = (data: LoginParams) =>
  axiosClient.post<User>(`/auth/login`, data);

export const getAuthUser = () => axiosClient.get<User>(`/auth/user`);

export const postAuthLogout = () => axiosClient.post<User>(`auth/logout`);

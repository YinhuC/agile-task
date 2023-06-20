import { LoginParams, RegisterParams } from '../types/auth.types';
import { User } from '../types/user.types';
import { axiosClient } from './client.api';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

export const postAuthRegister = (data: RegisterParams) =>
  axiosClient.post<User>('/auth/register', data, config);

export const postAuthLogin = (data: LoginParams) =>
  axiosClient.post<User>(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/user`, config);

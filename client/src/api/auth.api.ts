import { LoginParams, RegisterParams } from '../types/auth.types';
import { User } from '../types/user.types';
import { axiosClient } from './client.api';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterAuth = (data: RegisterParams) =>
  axiosClient.post('/auth/register', data, config);

export const postLoginUser = (data: LoginParams) =>
  axiosClient.post(`/auth/login`, data, config);

export const getAuthUser = () => axiosClient.get<User>(`/auth/user`, config);

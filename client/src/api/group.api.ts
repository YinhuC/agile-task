import { CreateGroupParams, UpdateGroupParams } from '../types/group.types';
import { axiosClient } from './client.api';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

export const getGroups = () => axiosClient.post('/groups', config);

export const createGroup = (data: CreateGroupParams) =>
  axiosClient.post('/groups', data, config);

export const updateGroup = (data: UpdateGroupParams, id: string) =>
  axiosClient.put(`/groups/${id}`, data, config);

export const deleteGroup = (id: string) =>
  axiosClient.delete(`/groups/${id}`, config);

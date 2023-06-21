import {
  CreateGroupParams,
  Group,
  GroupResponse,
  UpdateGroupParams,
} from '../types/group.types';
import { axiosClient } from './client.api';
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = { withCredentials: true };

export const getGroups = () => axiosClient.get<Group[]>('/groups', config);

export const createGroup = (data: CreateGroupParams) =>
  axiosClient.post<GroupResponse>('/groups', data, config);

export const updateGroup = (data: UpdateGroupParams, id: string) =>
  axiosClient.put<GroupResponse>(`/groups/${id}`, data, config);

export const deleteGroup = (id: string) =>
  axiosClient.delete(`/groups/${id}`, config);

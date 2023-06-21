import {
  CreateGroupParams,
  Group,
  GroupResponse,
  UpdateGroupParams,
} from '../types/group.types';
import { axiosClient } from './client.api';

export const getGroups = () => axiosClient.get<Group[]>('/groups');

export const createGroup = (data: CreateGroupParams) =>
  axiosClient.post<GroupResponse>('/groups', data);

export const updateGroup = ({ id, ...data }: UpdateGroupParams) =>
  axiosClient.put<GroupResponse>(`/groups/${id}`, data);

export const deleteGroup = (id: string) => axiosClient.delete(`/groups/${id}`);

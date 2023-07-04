import { CreateGroupParams, UpdateGroupParams } from '../../types/group.types';
import { store } from '..';
import {
  fetchAllGroupsThunk,
  createGroupThunk,
  updateGroupThunk,
  deleteGroupThunk,
} from './group.thunks';

jest.mock('../../api', () => ({
  group: {
    getGroups: jest.fn(),
    createGroup: jest.fn(),
    updateGroup: jest.fn(),
    deleteGroup: jest.fn(),
  },
}));

describe('Group Thunks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches createGroupThunk correctly', async () => {
    const params: CreateGroupParams = { name: 'New Group' };
    const createGroupMock = jest
      .fn()
      .mockResolvedValue({ data: { id: 1, ...params } });
    const groupModule = require('../../api').group;
    groupModule.createGroup.mockImplementation(createGroupMock);

    await store.dispatch(createGroupThunk(params));

    expect(createGroupMock).toHaveBeenCalledWith(params);
    expect(store.getState().groups).toEqual({
      groups: [{ id: 1, ...params }],
    });
  });

  it('dispatches updateGroupThunk correctly', async () => {
    const groupId = 1;
    const updatedGroup: UpdateGroupParams = {
      id: groupId,
      name: 'Updated Group',
    };

    const updateGroupMock = jest.fn().mockResolvedValue({ data: updatedGroup });

    const groupModule = require('../../api').group;
    groupModule.updateGroup.mockImplementation(updateGroupMock);

    await store.dispatch(updateGroupThunk(updatedGroup));

    expect(updateGroupMock).toHaveBeenCalledWith(updatedGroup);
    expect(store.getState().groups).toEqual({
      groups: [updatedGroup],
    });
  });

  it('dispatches fetchAllGroupsThunk correctly', async () => {
    const groups = [
      {
        id: 1,
        name: 'Updated Group',
      },
    ];
    const getGroupsMock = jest.fn().mockResolvedValue({ data: groups });
    const groupModule = require('../../api').group;
    groupModule.getGroups.mockImplementation(getGroupsMock);

    await store.dispatch(fetchAllGroupsThunk());

    expect(getGroupsMock).toHaveBeenCalled();
    expect(store.getState().groups).toEqual({ groups: groups });
  });

  it('dispatches deleteGroupThunk correctly', async () => {
    const groupId = 1;
    const deleteGroupMock = jest
      .fn()
      .mockResolvedValue({ data: { id: groupId } });
    const groupModule = require('../../api').group;
    groupModule.deleteGroup.mockImplementation(deleteGroupMock);

    await store.dispatch(deleteGroupThunk(groupId.toString()));

    expect(deleteGroupMock).toHaveBeenCalledWith(groupId.toString());
    expect(store.getState().groups).toEqual({
      groups: [],
    });
  });
});

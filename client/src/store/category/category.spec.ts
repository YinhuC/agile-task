import {
  createCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from './category.thunks';
import { store } from '..';
import {
  CreateCategoryParams,
  UpdateCategoryParams,
} from '../../types/category.types';

jest.mock('../../api', () => ({
  category: {
    createCategory: jest.fn(),
    updateCategory: jest.fn(),
    getAllCategories: jest.fn(),
    deleteCategory: jest.fn(),
  },
}));

describe('Async Thunks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches createCategoryThunk correctly', async () => {
    const params: CreateCategoryParams = { name: 'New Category', projectId: 1 };
    const createCategoryMock = jest
      .fn()
      .mockResolvedValue({ data: { id: 1, ...params } });
    const categoryModule = require('../../api').category;
    categoryModule.createCategory.mockImplementation(createCategoryMock);

    await store.dispatch(createCategoryThunk(params));

    expect(createCategoryMock).toHaveBeenCalledWith(params);
    expect(store.getState().categories).toEqual({
      categories: [{ id: 1, ...params }],
    });
  });

  it('dispatches updateCategoryThunk correctly', async () => {
    const categoryId = '1';
    const updatedCategory: UpdateCategoryParams = {
      id: parseInt(categoryId),
      name: 'Updated Category',
    };

    const updateCategoryMock = jest
      .fn()
      .mockResolvedValue({ data: updatedCategory });

    const categoryModule = require('../../api').category;
    categoryModule.updateCategory.mockImplementation(updateCategoryMock);

    await store.dispatch(updateCategoryThunk(updatedCategory));

    expect(updateCategoryMock).toHaveBeenCalledWith(updatedCategory);
    expect(store.getState().categories).toEqual({
      categories: [updatedCategory],
    });
  });

  it('dispatches deleteCategoryThunk correctly', async () => {
    const params: CreateCategoryParams = { name: 'New Category', projectId: 1 };
    const categoryId = '1';
    const deleteCategoryMock = jest
      .fn()
      .mockResolvedValue({ data: { id: parseInt(categoryId), ...params } });
    const categoryModule = require('../../api').category;
    categoryModule.deleteCategory.mockImplementation(deleteCategoryMock);

    await store.dispatch(deleteCategoryThunk(categoryId));

    expect(deleteCategoryMock).toHaveBeenCalledWith(categoryId);
    expect(store.getState().categories).toEqual({
      categories: [],
    });
  });
});

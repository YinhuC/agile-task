export type GetTasksParams = {
  categoryId: number;
};

export type CreateTaskParams = {
  name: string;
  categoryId: number;
};

export type UpdateTaskParams = {
  name: string;
};

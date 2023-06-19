export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  authMethod: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserParams = {
  email?: string;
  firstName?: string;
  lastName?: string;
  authMethod?: string;
  password?: string;
};

export type CreateGroupParams = {
  name: string;
  users?: string[];
};

export type UpdateGroupParams = {
  name?: string;
  users?: string[];
};

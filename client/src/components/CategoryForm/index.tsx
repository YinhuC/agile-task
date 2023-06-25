import React from 'react';
import { Button, Group, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import {
  CreateCategoryParams,
  UpdateCategoryParams,
} from '../../types/category.types';

type CategoryFormValues = {
  name: string;
};

type CategoryFormProps = {
  projectId: number;
  onSubmit: (values: CreateCategoryParams | UpdateCategoryParams) => void;
  form: UseFormReturnType<CategoryFormValues>;
  type: 'add' | 'edit';
  onDelete?: () => void;
};

function CategoryForm({
  projectId,
  onSubmit,
  form,
  type,
  onDelete,
}: CategoryFormProps) {
  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit({ ...values, projectId }))}
    >
      <TextInput
        mb={10}
        label='Title'
        placeholder='Title'
        required
        {...form.getInputProps('name')}
      />
      <Group position='right'>
        <Button type='submit' h={45}>
          {type === 'add' ? 'Create Category' : 'Edit Category'}
        </Button>
        {type === 'edit' && (
          <Button h={45} color='red' onClick={onDelete}>
            Delete Category
          </Button>
        )}
      </Group>
    </form>
  );
}

export default CategoryForm;

import React from 'react';
import { Button, Group, TextInput, Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import {
  CreateProjectParams,
  UpdateProjectParams,
} from '../../types/project.types';

type ProjectFormValues = {
  name: string;
  description: string;
};

type ProjectFormProps = {
  groupId: number;
  onSubmit: (values: CreateProjectParams | UpdateProjectParams) => void;
  form: UseFormReturnType<ProjectFormValues>;
  type: 'add' | 'edit';
  onDelete?: () => void;
};

function ProjectForm({
  groupId,
  onSubmit,
  form,
  type,
  onDelete,
}: ProjectFormProps) {
  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit({ ...values, groupId }))}
    >
      <TextInput
        mb={10}
        label='Title'
        placeholder='Title'
        required
        {...form.getInputProps('name')}
      />
      <Textarea
        mb={30}
        label='Description'
        placeholder='Description'
        autosize
        minRows={3}
        maxRows={5}
        {...form.getInputProps('description')}
      />
      <Group position='right'>
        <Button type='submit' h={45}>
          {type === 'add' ? 'Create Project' : 'Edit Project'}
        </Button>
        {type === 'edit' && (
          <Button h={45} color='red' onClick={onDelete}>
            Delete Project
          </Button>
        )}
      </Group>
    </form>
  );
}

export default ProjectForm;

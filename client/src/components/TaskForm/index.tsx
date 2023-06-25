import React from 'react';
import { Button, Group, TextInput, Textarea } from '@mantine/core';
import { CreateTaskParams, UpdateTaskParams } from '../../types/task.types';
import { UseFormReturnType } from '@mantine/form';

type TaskFormValues = {
  name: string;
  description: string;
};

type TaskFormProps = {
  categoryId: number;
  onSubmit: (values: CreateTaskParams | UpdateTaskParams) => void;
  form: UseFormReturnType<TaskFormValues>;
  type: 'add' | 'edit';
  values?: CreateTaskParams | UpdateTaskParams;
  onDelete?: () => void;
};

function TaskForm({
  categoryId,
  onSubmit,
  form,
  type,
  onDelete,
}: TaskFormProps) {
  return (
    <form
      onSubmit={form.onSubmit((values) => onSubmit({ ...values, categoryId }))}
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
          {type === 'add' ? 'Create Task' : 'Edit Task'}
        </Button>
        {type === 'edit' && (
          <Button h={45} color='red' onClick={onDelete}>
            Delete Task
          </Button>
        )}
      </Group>
    </form>
  );
}

export default TaskForm;

import React from 'react';
import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Category } from '../../types/category.types';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconEditCircle } from '@tabler/icons-react';
import {
  CreateTaskParams,
  Task,
  UpdateTaskParams,
} from '../../types/task.types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  createTaskThunk,
  deleteTaskThunk,
  updateTaskThunk,
} from '../../store/task/task.thunks';
import { GeneralErrorObject } from '../../utils/notification.utils';

type TaskModalProps = {
  category: Category;
  type: 'add' | 'edit';
  task?: Task;
};

function TaskModal({ category, type, task }: TaskModalProps) {
  const { id } = category;
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    initialValues: {
      name: type === 'edit' && task?.name ? task.name : '',
      description: type === 'edit' && task?.description ? task.description : '',
    },
    validate: {
      name: (value) =>
        value.length > 50
          ? 'Title should not be longer than 50 characters long.'
          : null,
      description: (value) =>
        value.length > 200
          ? 'Description should not be longer than 200 characters long.'
          : null,
    },
  });

  const onSubmit = async (values: CreateTaskParams | UpdateTaskParams) => {
    try {
      if (type === 'add') {
        dispatch(createTaskThunk(values as CreateTaskParams));
      } else {
        dispatch(updateTaskThunk(values as UpdateTaskParams));
      }
    } catch (err) {
      notifications.cleanQueue();
      notifications.show(GeneralErrorObject);
    }
    form.reset();
    close();
  };

  const onDelete = async () => {
    try {
      if (task && task.id) dispatch(deleteTaskThunk(task.id.toString()));
    } catch (err) {
      notifications.cleanQueue();
      notifications.show(GeneralErrorObject);
    }
    form.reset();
    close();
  };

  return (
    <>
      <Modal
        padding='xl'
        opened={opened}
        onClose={close}
        title={type === 'add' ? 'Create New Task' : 'Edit Task'}
        centered
        size='lg'
      >
        <form
          onSubmit={form.onSubmit((values) =>
            onSubmit({ ...values, categoryId: id })
          )}
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
      </Modal>
      {type === 'add' ? (
        <Button fullWidth onClick={open} variant='outline'>
          Add new task
        </Button>
      ) : (
        <Button
          onClick={open}
          size='xs'
          variant='subtle'
          mb={5}
          p={5}
          radius='50%'
        >
          <IconEditCircle size={20} />
        </Button>
      )}
    </>
  );
}

export default TaskModal;

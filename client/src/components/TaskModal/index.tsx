import React from 'react';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Category } from '../../types/category.types';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconEditCircle, IconX } from '@tabler/icons-react';
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
import TaskForm from '../TaskForm';

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
      notifications.show({
        title: 'An error occurred.',
        message: `Please try again later. ${err}`,
        color: 'red',
        icon: <IconX />,
      });
    }
    form.reset();
    close();
  };

  const onDelete = async () => {
    try {
      if (task && task.id) dispatch(deleteTaskThunk(task.id.toString()));
    } catch (err) {
      notifications.cleanQueue();
      notifications.show({
        title: 'An error occurred.',
        message: `Please try again later. ${err}`,
        color: 'red',
        icon: <IconX />,
      });
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
        <TaskForm
          categoryId={id}
          onSubmit={(values) => onSubmit(values)}
          form={form}
          type={type}
          onDelete={onDelete}
        />
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

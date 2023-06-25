import React from 'react';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  Category,
  CreateCategoryParams,
  UpdateCategoryParams,
} from '../../types/category.types';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconEditCircle } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { GeneralErrorObject } from '../../utils/notification.utils';
import CategoryForm from '../CategoryForm';
import {
  createCategoryThunk,
  deleteCategoryThunk,
  updateCategoryThunk,
} from '../../store/category/category.thunks';

type CategoryModalProps = {
  projectId: number;
  type: 'add' | 'edit';
  category?: Category;
};

function CategoryModal({ projectId, type, category }: CategoryModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    initialValues: {
      name: type === 'edit' && category?.name ? category.name : '',
    },
    validate: {
      name: (value) =>
        value.length > 30
          ? 'Title should not be longer than 30 characters long.'
          : null,
    },
  });

  const onSubmit = async (
    values: CreateCategoryParams | UpdateCategoryParams
  ) => {
    try {
      if (type === 'add') {
        dispatch(createCategoryThunk(values as CreateCategoryParams));
      } else {
        dispatch(updateCategoryThunk(values as UpdateCategoryParams));
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
      if (category && category.id)
        dispatch(deleteCategoryThunk(category.id.toString()));
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
        title={type === 'add' ? 'Create New Category' : 'Edit Category'}
        centered
        size='lg'
      >
        <CategoryForm
          projectId={projectId}
          onSubmit={(values) => onSubmit(values)}
          form={form}
          type={type}
          onDelete={onDelete}
        />
      </Modal>
      {type === 'add' ? (
        <Button onClick={open}>Add new category</Button>
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

export default CategoryModal;

import React, { useEffect } from 'react';
import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconEditCircle } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {} from '../../store/category/category.thunks';
import { GeneralErrorObject } from '../../utils/notification.utils';
import {
  CreateProjectParams,
  Project,
  UpdateProjectParams,
} from '../../types/project.types';
import {
  createProjectThunk,
  deleteProjectThunk,
  updateProjectThunk,
} from '../../store/project/project.thunks';

type ProjectModalProps = {
  groupId: number;
  type: 'add' | 'edit';
  project?: Project;
};

function ProjectModal({ groupId, type, project }: ProjectModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    initialValues: {
      name: type === 'edit' && project ? project.name : '',
      description: type === 'edit' && project ? project.description : '',
    },
    validate: {
      name: (value) =>
        value.length > 30
          ? 'Title should not be longer than 30 characters long.'
          : null,
      description: (value) =>
        value.length > 100
          ? 'Description should not be longer than 100 characters long.'
          : null,
    },
  });

  useEffect(() => {
    form.setValues({
      name: type === 'edit' && project ? project.name : '',
      description: type === 'edit' && project ? project.description : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, project]);

  const onSubmit = async (
    values: CreateProjectParams | UpdateProjectParams
  ) => {
    try {
      if (type === 'add') {
        dispatch(createProjectThunk(values as CreateProjectParams));
      } else {
        dispatch(updateProjectThunk(values as UpdateProjectParams));
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
      if (project && project.id)
        dispatch(deleteProjectThunk(project.id.toString()));
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
        title={type === 'add' ? 'Create New Project' : 'Edit Project'}
        centered
        size='lg'
      >
        <form
          onSubmit={form.onSubmit((values) =>
            onSubmit({ ...values, groupId, id: project?.id as number })
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
              {type === 'add' ? 'Create Project' : 'Edit Project'}
            </Button>
            {type === 'edit' && (
              <Button h={45} color='red' onClick={onDelete}>
                Delete Project
              </Button>
            )}
          </Group>
        </form>
      </Modal>
      {type === 'add' ? (
        <Button onClick={open}>Create Project</Button>
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

export default ProjectModal;

import React from 'react';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconEditCircle } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {} from '../../store/category/category.thunks';
import { GeneralErrorObject } from '../../utils/notification.utils';
import ProjectForm from '../ProjectForm';
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
import { Group } from '../../types/group.types';

type ProjectModalProps = {
  group: Group;
  type: 'add' | 'edit';
  project?: Project;
};

function ProjectModal({ group, type, project }: ProjectModalProps) {
  const { id } = group;
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    initialValues: {
      name: type === 'edit' && project?.name ? project.name : '',
      description:
        type === 'edit' && project?.description ? project.description : '',
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
        <ProjectForm
          groupId={id}
          onSubmit={(values) => onSubmit(values)}
          form={form}
          type={type}
          onDelete={onDelete}
        />
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

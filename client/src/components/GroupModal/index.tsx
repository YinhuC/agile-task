import React, { useEffect } from 'react';
import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconEditCircle } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { GeneralErrorObject } from '../../utils/notification.utils';
import {
  CreateGroupParams,
  Group as GroupType,
  UpdateGroupParams,
} from '../../types/group.types';
import {
  createGroupThunk,
  deleteGroupThunk,
  updateGroupThunk,
} from '../../store/group/group.thunks';

type GroupModalProps = {
  type: 'add' | 'edit';
  group?: GroupType;
};

function GroupModal({ type, group }: GroupModalProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm({
    initialValues: {
      name: type === 'edit' && group?.name ? group.name : '',
    },
    validate: {
      name: (value) =>
        value.length > 30
          ? 'Title should not be longer than 30 characters long.'
          : null,
    },
  });

  useEffect(() => {
    form.setValues({
      name: type === 'edit' && group?.name ? group.name : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, group]);

  const onSubmit = async (values: CreateGroupParams | UpdateGroupParams) => {
    try {
      if (type === 'add') {
        dispatch(createGroupThunk(values as CreateGroupParams));
      } else {
        dispatch(updateGroupThunk(values as UpdateGroupParams));
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
      if (group && group.id) dispatch(deleteGroupThunk(group.id.toString()));
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
        title={type === 'add' ? 'Create New Group' : 'Edit Group'}
        centered
        size='lg'
      >
        <form
          onSubmit={form.onSubmit((values) =>
            onSubmit({ ...values, id: group?.id })
          )}
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
              {type === 'add' ? 'Create Group' : 'Edit Group'}
            </Button>
            {type === 'edit' && (
              <Button h={45} color='red' onClick={onDelete}>
                Delete Group
              </Button>
            )}
          </Group>
        </form>
      </Modal>
      {type === 'add' ? (
        <Button onClick={open}>Create Group</Button>
      ) : (
        <Button onClick={open} size='xs' variant='subtle' p={5} radius='50%'>
          <IconEditCircle size={20} />
        </Button>
      )}
    </>
  );
}

export default GroupModal;

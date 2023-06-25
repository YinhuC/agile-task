import React from 'react';
import {
  Flex,
  Text,
  Title,
  Button,
  TextInput,
  PasswordInput,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconPassword, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { postAuthLogin } from '../../api/auth.api';
import { LoginParams } from '../../types/auth.types';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';
import { User } from '../../types/user.types';
import { GeneralErrorObject } from '../../utils/notification.utils';

function LoginPage() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: () => null,
      password: () => null,
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (values: LoginParams) => {
    try {
      const user: User = (await postAuthLogin(values)).data;
      navigate(`/boards/${user.id}`);
    } catch (err) {
      const axiosError = err as AxiosError;
      notifications.cleanQueue();
      if (axiosError.response?.status === 401) {
        notifications.show({
          title: 'Invalid email or password.',
          message: 'Please check your credentials and try again.',
          color: 'red',
          icon: <IconX />,
        });
      } else {
        notifications.show(GeneralErrorObject);
      }
    }
  };

  return (
    <Flex
      h='100%'
      w='100%'
      justify='center'
      align='center'
      direction='column'
      sx={{ minHeight: '100vh' }}
      py={50}
      px={20}
    >
      <Title order={2} mb={15}>
        Login.
      </Title>
      <Text mb={50}>Access your team projects by logging in.</Text>
      <Box miw={300} w='18%' mb={60}>
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            mb={20}
            icon={<IconAt />}
            placeholder='Email'
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            mb={30}
            icon={<IconPassword />}
            placeholder='Password'
            required
            {...form.getInputProps('password')}
          />
          <Button type='submit' fullWidth h={45}>
            Submit
          </Button>
        </form>
      </Box>
      <Box
        sx={{
          'a:visited': {
            color: 'blue',
          },
        }}
      >
        <Text size='xs'>
          Not registered? <Link to={'/register'}>Create account</Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default LoginPage;

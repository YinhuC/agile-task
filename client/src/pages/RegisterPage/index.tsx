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
import { IconAt, IconCheck, IconPassword, IconX } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { MESSAGES, REGEXES } from '../../utils/regex';
import { RegisterParams } from '../../types/auth.types';
import { postAuthRegister } from '../../api/auth.api';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';

function RegisterPage() {
  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      firstname: (value) =>
        REGEXES.NAME_REGEX.test(value) ? null : MESSAGES.NAME_REGEX_MESSAGE,
      lastname: (value) =>
        REGEXES.NAME_REGEX.test(value) ? null : MESSAGES.NAME_REGEX_MESSAGE,
      email: (value) =>
        REGEXES.EMAIL_REGEX.test(value) ? null : MESSAGES.EMAIL_REGEX_MESSAGE,
      password: (value) =>
        REGEXES.PASSWORD_REGEX.test(value)
          ? null
          : MESSAGES.PASSWORD_REGEX_MESSAGE,
      confirmPassword: (value, values) =>
        value === values.password
          ? null
          : `Passwords Don't Match. Please Try Again.`,
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (values: RegisterParams) => {
    try {
      await postAuthRegister(values);
      navigate('/login');
      notifications.cleanQueue();
      notifications.show({
        title: 'Account Created Successfully!',
        message:
          'Congratulations! Your user account has been successfully created. Welcome to our platform and get ready to explore!',
        color: 'green',
        icon: <IconCheck />,
      });
    } catch (err) {
      const axiosError = err as AxiosError;
      notifications.cleanQueue();
      if (axiosError.response?.status === 400) {
        notifications.show({
          title: 'Email Already Registered.',
          message: 'Please use a different email to register and try again.',
          color: 'red',
          icon: <IconX />,
        });
      } else {
        notifications.show({
          title: 'Account Creation Error',
          message:
            'An error occurred during the account creation process. Please double-check the provided information and try again.',
          color: 'red',
          icon: <IconX />,
        });
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
      <Title order={2} mb={20}>
        Create your account.
      </Title>
      <Text mb={50}>
        Create your account today and embark on a collaborative journey.
      </Text>
      <Box miw={300} w='24%' mb={60}>
        <form
          onSubmit={form.onSubmit(({ confirmPassword, ...values }) =>
            onSubmit(values)
          )}
        >
          <TextInput
            mb={20}
            placeholder='First Name'
            required
            {...form.getInputProps('firstname')}
          />
          <TextInput
            mb={20}
            placeholder='Last Name'
            required
            {...form.getInputProps('lastname')}
          />
          <TextInput
            mb={20}
            icon={<IconAt />}
            placeholder='Your email'
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            mb={20}
            icon={<IconPassword />}
            placeholder='Password'
            required
            {...form.getInputProps('password')}
          />
          <PasswordInput
            mb={30}
            icon={<IconPassword />}
            placeholder='Confirm Password'
            required
            {...form.getInputProps('confirmPassword')}
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
          Already have an acocunt? <Link to={'/login'}>Sign in</Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default RegisterPage;

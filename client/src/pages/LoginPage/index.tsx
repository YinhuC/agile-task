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
import { IconAt, IconPassword } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

function LoginPage() {
  // TODO: integrate with API to check if user credentials
  const todo = false;
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        todo
          ? null
          : 'Email not found. Please make sure you entered the correct email address.',
      password: (value) =>
        todo
          ? null
          : 'Incorrect password. Please check your password and try again.',
    },
  });

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
        Login
      </Title>
      <Text mb={70}>Sign in to your account to continue</Text>
      <Box miw={300} w='18%' mb={60}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            mb={20}
            icon={<IconAt />}
            label='Email'
            placeholder='Your email'
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            mb={30}
            icon={<IconPassword />}
            placeholder='Password'
            label='Password'
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

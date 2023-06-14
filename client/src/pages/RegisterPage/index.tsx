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
import { MESSAGES, REGEXES } from '../../utils/regex';

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
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

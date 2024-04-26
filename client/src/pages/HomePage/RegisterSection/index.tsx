import React from 'react';
import {
  Container,
  Stack,
  Title,
  Button,
  BoxProps,
  Box,
  useMantineTheme,
  Flex,
  TextInput,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { MdOutlineAlternateEmail } from 'react-icons/md';

function RegisterSection({ ...props }: BoxProps) {
  const theme = useMantineTheme();

  return (
    <Box
      {...props}
      sx={{
        background: theme.fn.linearGradient(
          90,
          theme.colors.violet[9],
          theme.colors.pink[5]
        ),
      }}
    >
      <Container
        size='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        py={70}
      >
        <Stack justify='center' align='center' sx={{ width: '100%' }} mx={10}>
          <Title align='center' order={1} color='white' weight={600} mb={10}>
            Start your Agile journey today.
          </Title>
          <Flex>
            <TextInput
              mr={10}
              icon={<MdOutlineAlternateEmail />}
              placeholder='Your email'
              aria-label='Your email'
              required
            />
            <Button
              component={Link}
              size='md'
              mr='0.5rem'
              to={''}
              aria-label='Discover different views'
              variant='light'
            >
              Sign up for free
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

export default RegisterSection;

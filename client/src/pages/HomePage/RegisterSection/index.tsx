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
      sx={{
        background: theme.fn.linearGradient(
          90,
          theme.colors.violet[9],
          theme.colors.pink[5]
        ),
      }}
      {...props}
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
          <Flex
            sx={{
              [theme.fn.smallerThan('sm')]: {
                flexDirection: 'column',
              },
            }}
            align='center'
            justify='center'
          >
            <TextInput
              icon={<MdOutlineAlternateEmail />}
              placeholder='Your email'
              aria-label='Your email'
              required
              sx={{
                marginRight: 10,
                [theme.fn.smallerThan('sm')]: {
                  margin: '0 0 10px 0',
                },
              }}
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

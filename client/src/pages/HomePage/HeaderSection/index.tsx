import React from 'react';
import {
  Container,
  Flex,
  Stack,
  Title,
  Text,
  Button,
  ContainerProps,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectScreen from '../../../assets/screenshots/project.png';

function HeaderSection({ ...props }: ContainerProps) {
  return (
    <Container
      {...props}
      size='lg'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      mb={100}
    >
      <Stack justify='center' align='center' sx={{ width: '100%' }} my={80}>
        <Title order={1}>Unmatched Project Efficiency.</Title>
        <Text mb={10} sx={{ fontSize: 16 }}>
          Seamlessly Manage Projects and Foster Team Collaboration, Regardless
          of Physical Proximity.
        </Text>
        <Flex>
          <Button component={Link} size='md' mr='0.5rem' to={'/login'}>
            Start 14-day free trial
          </Button>
        </Flex>
      </Stack>
      <Flex
        sx={{
          img: {
            position: 'relative',

            width: '100%',
            height: '100%',
          },
        }}
      >
        <motion.img src={ProjectScreen} />
      </Flex>
    </Container>
  );
}

export default HeaderSection;

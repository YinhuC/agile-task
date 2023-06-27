import React from 'react';
import {
  Container,
  Flex,
  Title,
  Text,
  ContainerProps,
  Stack,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { motion } from 'framer-motion';
import Image from '../../../assets/images/iphone-all-transparent.png';

function PhoneSection({ ...props }: ContainerProps) {
  const theme = useMantineTheme();
  return (
    <Container {...props} size='xl' py={120}>
      <Flex
        gap={50}
        sx={{
          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <Stack justify='center' spacing={5} mx={20}>
          <Text transform='uppercase' weight={700} size={14}>
            Agile Tasker
          </Text>
          <Title order={1} mb={10}>
            Empower Your Workflow.
          </Title>
          <Text sx={{ lineHeight: '160%' }} size={18} mb={20}>
            Discover the Power of Simplicity and Flexibility. Achieve Clarity
            with Boards, Lists, and Cards to Track Tasks and Assignments. Dive
            into Our Comprehensive Guide for a Seamless Start.
          </Text>
        </Stack>
        <Box
          sx={{
            img: {
              minWidth: 300,
              maxWidth: 1400,
              width: '100%',
            },
          }}
        >
          <motion.img src={Image} />
        </Box>
      </Flex>
    </Container>
  );
}

export default PhoneSection;

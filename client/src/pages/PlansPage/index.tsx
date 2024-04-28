import React from 'react';
import {
  Container,
  BoxProps,
  Box,
  useMantineTheme,
  Title,
  Button,
  Stack,
  Text,
} from '@mantine/core';

import Footer from '../../components/Footer';
import PriceCompare from '../../components/PriceCompare';

function PlansPage({ ...props }: BoxProps) {
  const theme = useMantineTheme();
  return (
    <>
      <Box
        id='views'
        {...props}
        sx={{
          background: theme.fn.linearGradient(
            180,
            theme.colors.blue[0],
            '#fff'
          ),
        }}
      >
        <Container size='lg' pt={80}>
          <Stack align='center'>
            <Title order={1} weight={500} align='center'>
              Agile Tasker, tailored to you.
            </Title>
            <Text align='center' size='lg' maw={800}>
              Trusted by millions worldwide, Agile Tasker empowers teams across
              the globe. Explore the options to find the perfect fit for you.
            </Text>
          </Stack>
        </Container>
        <Container size='lg' py={80}>
          <PriceCompare />
        </Container>
      </Box>

      <Box
        {...props}
        sx={{
          background: theme.fn.linearGradient(
            180,
            theme.colors.pink[0],
            '#fff'
          ),
        }}
      >
        <Container size='lg' py={80}>
          <Stack>
            <Title order={2} weight={500} mb={5} align='center'>
              Didn't find what you were after?
            </Title>
            <Button m='auto' size='md'>
              Make a suggestion
            </Button>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default PlansPage;

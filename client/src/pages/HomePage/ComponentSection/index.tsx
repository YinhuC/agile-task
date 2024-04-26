import React from 'react';
import {
  Container,
  Flex,
  Title,
  Text,
  BoxProps,
  Stack,
  Card,
  SimpleGrid,
  useMantineTheme,
  Box,
} from '@mantine/core';

function ComponentSection({ ...props }: BoxProps) {
  const theme = useMantineTheme();
  return (
    <Box
      {...props}
      sx={{
        background: theme.fn.linearGradient(180, '#fff', theme.colors.cyan[0]),
        marginTop: 140,
        [theme.fn.smallerThan('lg')]: {
          marginTop: 220,
        },
        [theme.fn.smallerThan('md')]: {
          marginTop: 180,
        },
        [theme.fn.smallerThan('sm')]: {
          marginTop: 250,
        },
        [theme.fn.smallerThan('xxs')]: {
          marginTop: 300,
        },
      }}
    >
      <Container
        size='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Flex>
          <Stack justify='center' spacing={5} mx={20}>
            <Text transform='uppercase' weight={700}>
              Simplifying collaboration
            </Text>
            <Title order={1} mb={10}>
              Scalable project workflows for all types of endeavors.
            </Title>

            <SimpleGrid
              cols={3}
              spacing='lg'
              breakpoints={[
                { maxWidth: theme.breakpoints.md, cols: 3, spacing: 'md' },
                { maxWidth: theme.breakpoints.sm, cols: 2, spacing: 'sm' },
                { maxWidth: theme.breakpoints.xs, cols: 1, spacing: 'sm' },
              ]}
              my={30}
            >
              <Card shadow='md' padding='lg' radius='md' withBorder>
                <Title order={2} mb={10} color={theme.colors.pink[9]}>
                  Boards
                </Title>
                <Text color='dimmed' size='sm'>
                  Where tasks find order and progress never stalls. From
                  'to-dos' to 'heck yeah, done!'—it's all in one glance.
                </Text>
              </Card>
              <Card shadow='sm' padding='lg' radius='md' withBorder>
                <Title order={2} mb={10} color={theme.colors.teal[9]}>
                  Lists
                </Title>
                <Text color='dimmed' size='sm'>
                  Task stages simplified: Start with To Do, Doing, or Done—or
                  craft a custom workflow tailored to your team. With Trello,
                  there's no wrong approach.
                </Text>
              </Card>
              <Card shadow='sm' padding='lg' radius='md' withBorder>
                <Title order={2} mb={10} color={theme.colors.blue[9]}>
                  Cards
                </Title>
                <Text color='dimmed' size='sm'>
                  Cards are the essence of tasks and ideas, containing all
                  details to drive completion. Progress seamlessly by moving
                  cards across lists.
                </Text>
              </Card>
            </SimpleGrid>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
}

export default ComponentSection;

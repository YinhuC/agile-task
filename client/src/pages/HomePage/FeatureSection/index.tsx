import React from 'react';
import {
  Container,
  Flex,
  Title,
  Text,
  Stack,
  Card,
  SimpleGrid,
  Button,
  useMantineTheme,
  ContainerProps,
} from '@mantine/core';

function FeatureSection({ ...props }: ContainerProps) {
  const theme = useMantineTheme();
  return (
    <Container {...props} size='lg' py={100}>
      <Flex>
        <Stack justify='center' spacing={5} mx={20}>
          <Text transform='uppercase' weight={700}>
            Unlock powerful growth strategies.
          </Text>
          <Title order={1} mb={10}>
            Maximize your potential with Agile Tasker.
          </Title>
          <Text>
            Trello's intuitive features enable any team to swiftly establish and
            personalize workflows for virtually any task
          </Text>

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
            <Card
              padding='lg'
              radius='md'
              withBorder
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.colors.gray[1],
              }}
            >
              <Title order={2} mb={15}>
                Integrations
              </Title>
              <Text color='dimmed' size='sm' mb={20}>
                Easily integrate the apps your team relies on into your Agile
                workflow or enhance it with a Power-Up tailored to your unique
                requirements.
              </Text>
              <Button mt='auto' variant='outline'>
                Insepct Integrations
              </Button>
            </Card>
            <Card
              padding='lg'
              radius='md'
              withBorder
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.colors.gray[1],
              }}
            >
              <Title order={2} mb={15}>
                Automation
              </Title>
              <Text color='dimmed' size='sm' mb={20}>
                Every Tasker board comes with built-in no-code automation.
                Concentrate on your most important tasks while letting the
                robots handle the rest.
              </Text>
              <Button mt='auto' variant='outline'>
                Analyse Automations
              </Button>
            </Card>
            <Card
              padding='lg'
              radius='md'
              withBorder
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.colors.gray[1],
              }}
            >
              <Title order={2} mb={15}>
                Enterprise
              </Title>
              <Text color='dimmed' size='sm' mb={20}>
                The beloved productivity tool for teams, equipped with the
                features and security essential for scalability.
              </Text>
              <Button mt='auto' variant='outline'>
                Explore Enterprise
              </Button>
            </Card>
          </SimpleGrid>
        </Stack>
      </Flex>
    </Container>
  );
}

export default FeatureSection;

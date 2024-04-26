import React from 'react';
import {
  Container,
  Stack,
  Title,
  Text,
  Button,
  BoxProps,
  Box,
  useMantineTheme,
  Card,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import PhoneImg from '../../../assets/images/iphone-all-transparent.png';
import ContentBlock from '../../../components/ContentBlock';

function BenefitSection({ ...props }: BoxProps) {
  const theme = useMantineTheme();

  return (
    <Box
      {...props}
      sx={{
        background: theme.fn.linearGradient(
          90,
          theme.colors.blue[9],
          theme.colors.cyan[5]
        ),
        maxHeight: 950,
        [theme.fn.smallerThan('lg')]: {
          maxHeight: 850,
        },
        [theme.fn.smallerThan('md')]: {
          maxHeight: 800,
        },
        [theme.fn.smallerThan('sm')]: {
          maxHeight: 1350,
        },

        [theme.fn.smallerThan('xxs')]: {
          maxHeight: 1400,
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
        pt={50}
      >
        <Stack justify='center' align='center' sx={{ width: '100%' }} mx={10}>
          <Title align='center' order={1} color='white' weight={600}>
            Experience work through a fresh lens.
          </Title>
          <Text align='center' mb={10} size='lg' color='white'>
            Gain comprehensive insights into your team's projects and approach
            tasks with a renewed perspective.
          </Text>
          <Button
            component={Link}
            size='md'
            mr='0.5rem'
            to={'/login'}
            aria-label='Discover different views'
            variant='light'
            mb={40}
          >
            Discover different views
          </Button>

          <Card
            shadow='md'
            padding='xl'
            radius='md'
            withBorder
            mb={50}
            sx={{
              [theme.fn.smallerThan('sm')]: {
                maxWidth: 500,
              },
            }}
          >
            <ContentBlock
              title={'Consistently meet deadlines.'}
              subtitle={`From weekly sprints to yearly strategies, Timeline view ensures tasks stay on course. 
              Easily preview upcoming milestones and spot any potential roadblocks hindering your team's advancement.`}
              img={PhoneImg}
              imageSize='80%'
              titleOrder={3}
              titleWeight={500}
            />
          </Card>

          <Card
            shadow='md'
            padding='xl'
            radius='md'
            withBorder
            sx={{
              [theme.fn.smallerThan('sm')]: {
                maxWidth: 500,
              },
            }}
          >
            <ContentBlock
              title={'Stay in control of tasks.'}
              subtitle={`Navigate from weekly sprints to yearly plans seamlessly with Timeline view, ensuring all tasks stay on course. 
              Get a quick overview of upcoming milestones and detect any potential gaps that could hinder your team's progress.`}
              img={PhoneImg}
              imageLeft={false}
              imageSize='80%'
              titleOrder={3}
              titleWeight={500}
            />
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}

export default BenefitSection;

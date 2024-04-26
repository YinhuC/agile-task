import React from 'react';
import {
  Container,
  Stack,
  Title,
  Text,
  BoxProps,
  Box,
  useMantineTheme,
  SimpleGrid,
  Button,
} from '@mantine/core';
import PriceCard from '../../../components/PriceCard';

function PriceSection({ ...props }: BoxProps) {
  const theme = useMantineTheme();

  return (
    <Box
      {...props}
      sx={{
        background: theme.fn.linearGradient(
          180,
          theme.colors.cyan[0],
          theme.colors.cyan[1]
        ),
      }}
      py={80}
    >
      <Container
        size='lg'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack
          justify='center'
          align='center'
          sx={{ width: '100%' }}
          mx={10}
          mb={60}
        >
          <Title align='center' order={1} weight={600}>
            Priced to fit your needs.
          </Title>
          <Text align='center' mb={10} size='lg'>
            Millions trust Agile Tasker to empower teams globally.
          </Text>
          <Button size='md'>Compare all plans</Button>
        </Stack>

        <SimpleGrid
          cols={4}
          sx={{
            height: '100%',
            gap: 0,
            [theme.fn.smallerThan('sm')]: {
              gap: 20,
            },
          }}
          breakpoints={[{ maxWidth: '48rem', cols: 1, spacing: 'sm' }]}
        >
          <PriceCard
            tier={'Free'}
            amount={0}
            amountDescription={'Free for your entire team.'}
            tierDescription={
              'For individuals or teams looking to organize any project.'
            }
            buttonText={'Try for free'}
          />
          <PriceCard
            tier={'Standard'}
            amount={100}
            amountDescription={
              'Per user per month when billed annually ($120 when billed monthly).'
            }
            tierDescription={
              'For small teams seeking to manage tasks and expand collaboration.'
            }
            buttonText={'Sign up now'}
          />

          <PriceCard
            tier={'Premium'}
            amount={200}
            amountDescription={
              'Per user per month when billed annually ($240 when billed monthly).'
            }
            tierDescription={
              'For teams requiring comprehensive project tracking and visualization across various formats like boards, timelines, calendars, and more.'
            }
            buttonText={'Get started now'}
          />
          <PriceCard
            tier={'Enterprise'}
            amount={300}
            amountDescription={
              'Per user per month when billed annually ($390 when billed monthly).'
            }
            tierDescription={
              'For organizations necessitating secure and controlled connectivity of work across multiple teams.'
            }
            buttonText={'Contact sales'}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default PriceSection;

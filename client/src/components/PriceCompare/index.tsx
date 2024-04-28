import React from 'react';
import { useMantineTheme, SimpleGrid, SimpleGridProps } from '@mantine/core';
import PriceCard from '../PriceCard';

function PriceCompare({ ...props }: SimpleGridProps) {
  const theme = useMantineTheme();

  return (
    <SimpleGrid
      {...props}
      cols={4}
      sx={{
        height: '100%',
        gap: 0,
        [theme.fn.smallerThan('sm')]: {
          gap: 20,
        },
      }}
      breakpoints={[{ maxWidth: theme.breakpoints.sm, cols: 1, spacing: 'sm' }]}
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
        amount={10}
        amountDescription={
          'Per user per month when billed annually ($12 when billed monthly).'
        }
        tierDescription={
          'For small teams seeking to manage tasks and expand collaboration.'
        }
        buttonText={'Sign up now'}
      />

      <PriceCard
        tier={'Premium'}
        amount={20}
        amountDescription={
          'Per user per month when billed annually ($24 when billed monthly).'
        }
        tierDescription={
          'For teams requiring comprehensive project tracking and visualization across various formats like boards, timelines, calendars, and more.'
        }
        buttonText={'Get started now'}
        highlight={true}
      />
      <PriceCard
        tier={'Enterprise'}
        amount={30}
        amountDescription={
          'Per user per month when billed annually ($39 when billed monthly).'
        }
        tierDescription={
          'For organizations necessitating secure and controlled connectivity of work across multiple teams.'
        }
        buttonText={'Contact sales'}
      />
    </SimpleGrid>
  );
}

export default PriceCompare;

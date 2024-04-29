import React from 'react';
import {
  Text,
  useMantineTheme,
  Button,
  Card,
  Sx,
  CardProps,
} from '@mantine/core';

type PriceCardProps = Omit<CardProps, 'children'> & {
  tier: string;
  amount: number;
  amountDescription: string;
  tierDescription: string;
  buttonText: string;
  highlight?: boolean;
  backgroundColor?: string;
  sx?: Sx;
};

function PriceCard({
  tier,
  amount,
  amountDescription,
  tierDescription,
  buttonText,
  highlight = false,
  backgroundColor = 'transparent',
  sx,
  ...props
}: PriceCardProps) {
  const theme = useMantineTheme();

  return (
    <Card
      padding='lg'
      radius={0}
      sx={[
        {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: backgroundColor,
          border: highlight
            ? `0.125rem solid ${theme.colors.pink[3]}`
            : '0.0625rem solid #dee2e6',
          [theme.fn.smallerThan('sm')]: {
            height: 'auto',
          },
        },
        sx,
      ]}
      {...props}
    >
      <Text transform='uppercase' weight={700} mb={30} mt={20}>
        {tier}
      </Text>
      <Text size={36} mb={5}>
        ${amount} USD
      </Text>
      <Text color='dimmed' size='xs' mb={40} sx={{ height: 28.8 }}>
        {amountDescription}
      </Text>
      <Text mb={80}>{tierDescription}</Text>
      <Button mt='auto' variant='outline'>
        {buttonText}
      </Button>
    </Card>
  );
}

export default PriceCard;

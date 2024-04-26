import React from 'react';
import { Text, useMantineTheme, Button, Card } from '@mantine/core';

type PriceCardProps = {
  tier: string;
  amount: number;
  amountDescription: string;
  tierDescription: string;
  buttonText: string;
};

function PriceCard({
  tier,
  amount,
  amountDescription,
  tierDescription,
  buttonText,
}: PriceCardProps) {
  const theme = useMantineTheme();

  return (
    <Card
      padding='lg'
      withBorder
      radius={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.colors.gray[0],
      }}
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

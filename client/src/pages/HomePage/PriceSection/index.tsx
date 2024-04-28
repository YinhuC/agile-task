import React from 'react';
import {
  Container,
  Stack,
  Title,
  Text,
  BoxProps,
  Box,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import PriceCompare from '../../../components/PriceCompare';

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
      pt={80}
      pb={120}
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
          <Button size='md' component={Link} to='/plans'>
            Compare all plans
          </Button>
        </Stack>

        <PriceCompare />
      </Container>
    </Box>
  );
}

export default PriceSection;

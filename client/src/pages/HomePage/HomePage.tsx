import React from 'react';
import { Container, Paper, Text } from '@mantine/core';

function HomePage() {
  return (
    <Container size='md'>
      <Paper shadow='sm'>
        <Text size='xl' align='center' style={{ marginBottom: '1rem' }}>
          Welcome to the Homepage
        </Text>
      </Paper>
    </Container>
  );
}

export default HomePage;

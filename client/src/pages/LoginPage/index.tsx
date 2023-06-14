import React from 'react';
import { Flex, Container, Text, Title } from '@mantine/core';

function LoginPage() {
  return (
    <Container>
      <Flex
        justify='center'
        align='center'
        direction='column'
        sx={{ minHeight: '100vh' }}
      >
        <Title order={2} mb={20}>
          Login
        </Title>
        <Text>Sign in to your account to continue</Text>
      </Flex>
    </Container>
  );
}

export default LoginPage;

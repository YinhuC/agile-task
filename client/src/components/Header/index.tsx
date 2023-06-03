import React from 'react';
import { Container, Text, Button, Flex, Box } from '@mantine/core';

const Header: React.FC = () => {
  return (
    <Container size='xl'>
      <Flex
        p='md'
        justify='space-between'
        align='center'
        direction='row'
        sx={{ height: 80 }}
        mb={60}
      >
        <Text weight={700} size='xl'>
          Logo
        </Text>
        <Box>
          <Button size='md' variant='outline' mr='0.5rem'>
            Sign In
          </Button>
          <Button size='md'>Buy Now</Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;

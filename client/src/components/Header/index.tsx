import React from 'react';
import { Container, Text, Button, Flex, Box } from '@mantine/core';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Container size='lg'>
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
          <Link to={'/login'}>
            <Button size='md' variant='outline' mr='0.5rem'>
              Sign In
            </Button>
          </Link>
          <Link to={'/login'}>
            <Button size='md'>Buy Now</Button>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;

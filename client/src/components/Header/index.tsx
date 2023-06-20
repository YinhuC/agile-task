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
          <Button
            component={Link}
            size='md'
            variant='outline'
            mr='0.5rem'
            to={'/login'}
          >
            Sign In
          </Button>
          <Button component={Link} size='md' to={'/login'}>
            Buy Now
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;

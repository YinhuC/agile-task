import React from 'react';
import { Container, Text, Button, Flex, Box } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { notifications } from '@mantine/notifications';
import { GeneralErrorObject } from '../../utils/notification.utils';
import { postAuthLogout } from '../../api/auth.api';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await postAuthLogout();
      navigate(`/login`);
    } catch (err) {
      notifications.cleanQueue();
      notifications.show(GeneralErrorObject);
    }
  };

  return (
    <Container size='lg'>
      <Flex
        p='md'
        justify='space-between'
        align='center'
        direction='row'
        sx={{ height: 80 }}
        mb={20}
      >
        <Text weight={700} size='xl'>
          Logo
        </Text>
        <Box>
          {user ? (
            <>
              <Button onClick={logout} variant='outline' compact>
                Logout
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;

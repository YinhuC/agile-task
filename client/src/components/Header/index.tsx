import React from 'react';
import { Container, Image, Button, Flex, Box, MediaQuery } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { notifications } from '@mantine/notifications';
import { GeneralErrorObject } from '../../utils/notification.utils';
import { postAuthLogout } from '../../api/auth.api';
import Logo from '../../assets/logos/transparent-agile.png';
import SmallLogo from '../../assets/logos/transparent-a.png';

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
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Image src={Logo} width={200} sx={{ overflow: 'hidden' }} />
        </MediaQuery>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Image src={SmallLogo} width={100} sx={{ overflow: 'hidden' }} />
        </MediaQuery>
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

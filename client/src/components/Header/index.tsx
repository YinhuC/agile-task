import React from 'react';
import { Container, Image, Button, Flex, MediaQuery } from '@mantine/core';
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
    <Container size='xl' sx={{ borderBottom: '1px solid lightgray' }}>
      <Flex
        py='md'
        justify='space-between'
        align='center'
        direction='row'
        sx={{ height: 80 }}
        mx={5}
      >
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Link to={'/'}>
            <Image src={Logo} width={200} sx={{ overflow: 'hidden' }} />
          </Link>
        </MediaQuery>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Link to={'/'}>
            <Image src={SmallLogo} width={100} sx={{ overflow: 'hidden' }} />
          </Link>
        </MediaQuery>

        <Flex justify='flex-end' align='center' w={200} mr={20}>
          {user ? (
            <>
              <Button
                component={Link}
                variant='link'
                mr={20}
                to={'/'}
                sx={{ fontWeight: 400 }}
              >
                Home
              </Button>
              <Button
                component={Link}
                variant='link'
                to={`/boards/${user.id}`}
                sx={{ fontWeight: 400 }}
                mr={40}
              >
                Board
              </Button>
              <Button onClick={logout} variant='outline' compact radius='xs'>
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
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;

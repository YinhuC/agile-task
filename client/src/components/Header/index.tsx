import React from 'react';
import {
  Container,
  Image,
  Button,
  Flex,
  MediaQuery,
  ContainerProps,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { notifications } from '@mantine/notifications';
import { GeneralErrorObject } from '../../utils/notification.utils';
import { postAuthLogout } from '../../api/auth.api';
import Logo from '../../assets/logos/logo-transparent.png';
import SmallLogo from '../../assets/logos/small-logo-transparent.png';

const Header: React.FC = ({ ...props }: ContainerProps) => {
  const { user, removeUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await postAuthLogout();
      navigate(`/`);
      removeUser();
    } catch (err) {
      notifications.cleanQueue();
      notifications.show(GeneralErrorObject);
    }
  };

  return (
    <Container
      {...props}
      size='xl'
      sx={{ borderBottom: '1px solid lightgray' }}
    >
      <Flex
        py='md'
        justify='space-between'
        align='center'
        direction='row'
        sx={{ height: 80, overflow: 'hidden' }}
        mx={5}
      >
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Link to={'/'}>
            <Image src={Logo} width={200} />
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
              <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
                <Button
                  component={Link}
                  variant='link'
                  mr={20}
                  to={'/'}
                  sx={{ fontWeight: 400 }}
                >
                  Home
                </Button>
              </MediaQuery>
              <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
                <Button
                  component={Link}
                  variant='link'
                  to={`/boards/${user.id}`}
                  sx={{ fontWeight: 400 }}
                  mr={40}
                >
                  Board
                </Button>
              </MediaQuery>
              <Button onClick={logout} variant='outline' compact radius='xs'>
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              size='md'
              variant='outline'
              mr='0.5rem'
              to={'/login'}
              compact
            >
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Header;

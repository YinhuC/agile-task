import React from 'react';
import {
  Image,
  Button,
  Flex,
  MediaQuery,
  ContainerProps,
  useMantineTheme,
} from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { notifications } from '@mantine/notifications';
import { GeneralErrorObject } from '../../utils/notification.utils';
import { postAuthLogout } from '../../api/auth.api';
import Logo from '../../assets/logos/logo-transparent.png';
import SmallLogo from '../../assets/logos/small-logo-transparent.png';
import { usePrevious, useWindowScroll } from '@mantine/hooks';

const Header: React.FC = ({ ...props }: ContainerProps) => {
  const { user, removeUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();
  const [scroll] = useWindowScroll();
  const prevScroll = usePrevious(scroll);

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
    <Flex
      {...props}
      py='md'
      mx={5}
      justify='space-around'
      align='center'
      sx={{
        position: 'fixed',
        zIndex: 9,
        width: '100vw',
        overflow: 'hidden',
        backgroundColor:
          location.pathname === '/' ? theme.colors.gray[1] : 'white',
        borderBottom:
          location.pathname === '/' ? '1px solid gray' : '1px solid lightgray',
        height: 80,
        marginTop: prevScroll && scroll.y > prevScroll.y ? -100 : 0,
        transition: 'margin-top 0.5s ease-out',
      }}
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
  );
};

export default Header;

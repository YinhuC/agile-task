import React, { useState } from 'react';
import {
  Container,
  Flex,
  Stack,
  Title,
  Text,
  Button,
  BoxProps,
  Box,
  useMantineTheme,
  MediaQuery,
  Image,
  Skeleton,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { throttle } from 'lodash';

import MacScreen from '../../../assets/images/parallax/project-parallax.png';
import PhoneScreen from '../../../assets/images/parallax/phone-parallax.png';
import DeviceSquare from '../../../assets/images/parallax/device-parallax.png';
import TeamSquare from '../../../assets/images/parallax/team-parallax.png';
import IphoneProject from '../../../assets/images/iphone/iphone-project.png';

function HeaderSection({ ...props }: BoxProps) {
  const [loading, setLoading] = useState(true);

  const theme = useMantineTheme();
  const imgAnimate1 = useAnimation();
  const imgAnimate2 = useAnimation();
  const imgAnimate3 = useAnimation();
  const imgAnimate4 = useAnimation();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    const moveX = window.innerWidth / 2 - clientX * 2;
    const moveY = window.innerHeight / 2 - clientY * 2;
    imgAnimate1.start({
      x: moveX / 250,
      y: moveY / 250,
    });
    imgAnimate2.start({
      x: moveX / 80,
      y: moveY / 80,
    });
    imgAnimate3.start({
      x: moveX / 50,
      y: moveY / 50,
    });
    imgAnimate4.start({
      x: moveX / 50,
      y: moveY / 50,
    });
  };
  const throttledMouseMove = throttle(handleMouseMove, 100);

  return (
    <Box
      {...props}
      onMouseMove={(e) => throttledMouseMove(e)}
      sx={{
        background: theme.fn.linearGradient(
          180,
          theme.colors.pink[7],
          theme.colors.teal[3]
        ),
      }}
    >
      <Container
        size='xl'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        pt={100}
        pb={50}
      >
        <Stack
          justify='center'
          align='center'
          sx={{ width: '100%' }}
          mb={60}
          mx={10}
        >
          <Title align='center' order={1} color='white' weight={600}>
            Unmatched Project Efficiency.
          </Title>
          <Text align='center' mb={10} size='lg' color='white'>
            Seamlessly Manage Projects and Foster Team Collaboration, Regardless
            of Physical Proximity.
          </Text>
          <Button
            component={Link}
            variant='light'
            size='md'
            mr='0.5rem'
            to={'/register'}
            aria-label='Start 14-day free trial'
          >
            Start 14-day free trial
          </Button>
        </Stack>
        <MediaQuery smallerThan='md' styles={{ display: 'none' }}>
          <Flex
            mx={20}
            sx={{
              img: {
                position: 'relative',
                width: '90%',
                height: '100%',
              },
            }}
          >
            <Skeleton
              width={(window.innerWidth / 100) * 90}
              radius={12}
              height={(window.innerHeight / 100) * 75}
              sx={{
                display: loading ? 'block' : 'none',
              }}
            />
            <motion.img
              animate={imgAnimate1}
              src={MacScreen}
              alt='project screen wide screen'
              onLoad={() => setLoading(false)}
              style={{ display: loading ? 'none' : 'block' }}
            />
            <Box
              sx={{
                position: 'absolute',
              }}
            >
              <motion.img
                animate={imgAnimate2}
                src={PhoneScreen}
                alt='project screen mobile screen'
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
              }}
            >
              <motion.img
                animate={imgAnimate3}
                src={DeviceSquare}
                alt='device info'
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
              }}
            >
              <motion.img
                animate={imgAnimate4}
                src={TeamSquare}
                alt='team info'
              />
            </Box>
          </Flex>
        </MediaQuery>
        <MediaQuery largerThan='md' styles={{ display: 'none' }}>
          <Image
            src={IphoneProject}
            sx={{
              overflow: 'hidden',
              width: '100%',
              minWidth: 250,
              maxWidth: 500,
            }}
            alt='Iphone project page'
          />
        </MediaQuery>
        <Title align='center' order={2} weight={500} mt={100} mx={10}>
          Join the global community of over 2,000,000 teams leveraging Agile
          Tasker to achieve greater productivity.
        </Title>
      </Container>
    </Box>
  );
}

export default HeaderSection;

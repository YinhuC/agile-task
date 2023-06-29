import React from 'react';
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
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { throttle } from 'lodash';

import MacScreen from '../../../assets/images/parallax/project-parallax.png';
import PhoneScreen from '../../../assets/images/parallax/phone-parallax.png';
import DeviceSquare from '../../../assets/images/parallax/device-parallax.png';
import TeamSquare from '../../../assets/images/parallax/team-parallax.png';

function HeaderSection({ ...props }: BoxProps) {
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
          theme.colors.pink[1],
          theme.colors.teal[1]
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
        pt={200}
        pb={100}
      >
        <Stack
          justify='center'
          align='center'
          sx={{ width: '100%' }}
          mb={60}
          mx={10}
        >
          <Title align='center' order={1}>
            Unmatched Project Efficiency.
          </Title>
          <Text align='center' mb={10} sx={{ fontSize: 16 }}>
            Seamlessly Manage Projects and Foster Team Collaboration, Regardless
            of Physical Proximity.
          </Text>
          <Flex>
            <Button component={Link} size='md' mr='0.5rem' to={'/login'}>
              Start 14-day free trial
            </Button>
          </Flex>
        </Stack>
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
          <motion.img
            animate={imgAnimate1}
            src={MacScreen}
            alt='project screen wide screen'
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
      </Container>
    </Box>
  );
}

export default HeaderSection;

import React from 'react';
import {
  Flex,
  Text,
  useMantineTheme,
  Container,
  Box,
  Divider,
  BoxProps,
  SimpleGrid,
  Image,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import LogoLight from '../../assets/logos/logo-light.png';

type FooterProps = BoxProps & {};

function Footer({ ...props }: FooterProps) {
  const theme = useMantineTheme();
  return (
    <Box
      {...props}
      sx={{
        background: theme.colors.gray[9],
      }}
    >
      <Container size='lg' py={10}>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: theme.breakpoints.md, cols: 1, spacing: 'sm' },
          ]}
        >
          <Image src={LogoLight} width={200} />
        </SimpleGrid>
      </Container>

      <Divider mx={30} color={theme.colors.gray[5]} />

      <Container
        size='lg'
        py={20}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          [theme.fn.smallerThan('md')]: {
            flexDirection: 'column',
            gap: 15,
          },
        }}
      >
        <Flex
          gap={15}
          sx={{
            [theme.fn.smallerThan('md')]: {
              flexDirection: 'column',
              margin: '0 30px',
            },
          }}
        >
          <Text color={theme.colors.gray[5]} size='sm' mr={20}>
            Copyright © 2024 Agile Tasker.
          </Text>
          <Link to={''} style={{ textDecorationLine: 'none' }}>
            <Text color={theme.colors.gray[5]} size='sm'>
              Privacy Policy
            </Text>
          </Link>
          <Link to={''} style={{ textDecorationLine: 'none' }}>
            <Text color={theme.colors.gray[5]} size='sm'>
              Terms and Conditions
            </Text>
          </Link>
        </Flex>

        <Flex
          gap={30}
          sx={{
            [theme.fn.smallerThan('md')]: {
              margin: '0 30px',
            },
          }}
        >
          <Link to={''}>
            <FaInstagram size={16} color={theme.colors.gray[5]} />
          </Link>
          <Link to={''}>
            <FaFacebook size={16} color={theme.colors.gray[5]} />
          </Link>
          <Link to={''}>
            <FaLinkedin size={16} color={theme.colors.gray[5]} />
          </Link>
          <Link to={''}>
            <FaTwitter size={16} color={theme.colors.gray[5]} />
          </Link>
          <Link to={''}>
            <FaYoutube size={16} color={theme.colors.gray[5]} />
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;

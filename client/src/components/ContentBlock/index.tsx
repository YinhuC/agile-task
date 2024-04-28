import React, { useState } from 'react';
import {
  Flex,
  Title,
  Text,
  Stack,
  useMantineTheme,
  Skeleton,
  FlexProps,
  Sx,
  TitleOrder,
} from '@mantine/core';
import { motion } from 'framer-motion';

type ContentBlockProps = FlexProps & {
  img: string;
  text?: string;
  title?: string;
  subtitle?: string;
  imageLeft?: boolean;
  imageTop?: boolean;
  imageSize?: string;
  titleOrder?: TitleOrder;
  titleWeight?: number;
  sx?: Sx;
};

function ContentBlock({
  text,
  title,
  subtitle,
  img,
  imageLeft = true,
  imageTop = true,
  imageSize = '100%',
  titleOrder = 1,
  titleWeight = 400,
  sx,
  ...props
}: ContentBlockProps) {
  const [loading, setLoading] = useState(true);
  const theme = useMantineTheme();
  return (
    <Flex
      {...props}
      gap={30}
      sx={[
        {
          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
          },
        },
        sx,
      ]}
    >
      <Stack
        justify='center'
        spacing={5}
        mx={20}
        sx={{
          order: imageLeft ? 1 : 0,
          [theme.fn.smallerThan('sm')]: {
            order: imageTop ? 1 : 0,
          },
        }}
      >
        {text && (
          <Text transform='uppercase' weight={700}>
            {text}
          </Text>
        )}
        {title && (
          <Title order={titleOrder} mb={10} weight={titleWeight}>
            {title}
          </Title>
        )}
        {subtitle && (
          <Text sx={{ lineHeight: '160%' }} mb={20}>
            {subtitle}
          </Text>
        )}
      </Stack>

      <Flex
        sx={{
          order: imageLeft ? 0 : 1,
          [theme.fn.smallerThan('sm')]: {
            order: imageTop ? 0 : 1,
          },
          img: {
            maxWidth: 1400,
            width: imageSize,
          },
        }}
        justify='center'
      >
        <Skeleton
          width={(window.innerWidth / 100) * 40}
          radius={12}
          height={(window.innerHeight / 100) * 50}
          sx={{
            display: loading ? 'block' : 'none',
          }}
        />
        <motion.img
          src={img}
          alt='agile tasker on mobile'
          style={{
            display: loading ? 'none' : 'block',
          }}
          onLoad={() => setLoading(false)}
        />
      </Flex>
    </Flex>
  );
}

export default ContentBlock;

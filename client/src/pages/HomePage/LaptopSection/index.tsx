import React, { useState } from 'react';
import {
  Container,
  ContainerProps,
  Image,
  Center,
  BackgroundImage,
  Skeleton,
} from '@mantine/core';
import LaptopImage from '../../../assets/images/mac/mac-board.png';
import BackgroundWaveImage from '../../../assets/images/wave.svg';

function LaptopSection({ ...props }: ContainerProps) {
  const [loading, setLoading] = useState(true);

  return (
    <BackgroundImage src={BackgroundWaveImage}>
      <Container {...props} size='xl' py={30}>
        <Center>
          <Skeleton
            width={(window.innerWidth / 100) * 70}
            radius={12}
            height={(window.innerWidth / 100) * 45}
            sx={{
              display: loading ? 'block' : 'none',
            }}
          />
          <Image
            src={LaptopImage}
            sx={{
              width: '100%',
              minWidth: 300,
              maxWidth: 1100,
              display: loading ? 'none' : 'block',
            }}
            alt='agiler tasker on laptop'
            onLoad={() => setLoading(false)}
          />
        </Center>
      </Container>
    </BackgroundImage>
  );
}

export default LaptopSection;

import React from 'react';
import {
  Container,
  ContainerProps,
  Image,
  Center,
  BackgroundImage,
} from '@mantine/core';
import LaptopImage from '../../../assets/images/mac-board.png';
import BackgroundWaveImage from '../../../assets/images/wave.svg';

function LaptopSection({ ...props }: ContainerProps) {
  return (
    <BackgroundImage src={BackgroundWaveImage}>
      <Container {...props} size='xl' py={100}>
        <Center>
          <Image
            src={LaptopImage}
            sx={{ width: '100%', minWidth: 300, maxWidth: 1100 }}
            alt='agiler tasker on laptop'
          />
        </Center>
      </Container>
    </BackgroundImage>
  );
}

export default LaptopSection;

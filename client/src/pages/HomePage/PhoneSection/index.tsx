import React from 'react';
import { Container, BoxProps, Box, useMantineTheme } from '@mantine/core';
import PhoneImg from '../../../assets/images/iphone-all-transparent.png';
import ContentBlock from '../../../components/ContentBlock';

function PhoneSection({ ...props }: BoxProps) {
  const theme = useMantineTheme();
  return (
    <Box
      {...props}
      sx={{
        background: theme.fn.linearGradient(180, '#fff', theme.colors.cyan[1]),
      }}
    >
      <Container size='lg' py={30}>
        <ContentBlock
          title={'Empower Your Workflow.'}
          text={'Agile Tasker'}
          subtitle={`Discover the Power of Simplicity and Flexibility. Achieve Clarity with Boards, Lists, 
            and Cards to Track Tasks and Assignments. Dive into Our Comprehensive Guide for a Seamless Start.`}
          img={PhoneImg}
          imageLeft={false}
          imageTop={false}
        />
      </Container>
    </Box>
  );
}

export default PhoneSection;
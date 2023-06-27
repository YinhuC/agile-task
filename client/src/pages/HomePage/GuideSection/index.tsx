import React from 'react';
import { Container, Flex, Title, Text, ContainerProps } from '@mantine/core';

function GuideSection({ ...props }: ContainerProps) {
  return (
    <Container {...props} size='lg'>
      <Flex direction='column' justify='center' gap={10} sx={{ width: '60%' }}>
        <Text transform='uppercase' weight={700} size={14}>
          Agile Tasker
        </Text>
        <Title order={1} mb={10}>
          Empower Your Workflow.
        </Title>
        <Text sx={{ lineHeight: '160%' }} size={18} mb={20}>
          Discover the Power of Simplicity and Flexibility. Achieve Clarity with
          Boards, Lists, and Cards to Track Tasks and Assignments. Dive into Our
          Comprehensive Guide for a Seamless Start.
        </Text>
      </Flex>
    </Container>
  );
}

export default GuideSection;

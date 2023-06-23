import React from 'react';
import { Card, Title, Text } from '@mantine/core';
import { Task } from '../../types/task.types';

type TaskCardProps = {
  task: Task;
};

function TaskCard({ task }: TaskCardProps) {
  const { name, description } = task;
  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder w={300}>
      <Title order={5} mb={10}>
        {name}
      </Title>
      <Text size='sm' color='dimmed'>
        {description}
      </Text>
    </Card>
  );
}

export default TaskCard;

import React from 'react';
import { Card, Title, Text } from '@mantine/core';
import { Task } from '../../types/task.types';
import { Draggable } from 'react-beautiful-dnd';

type TaskCardProps = {
  task: Task;
  index: number;
};

function TaskCard({ task, index }: TaskCardProps) {
  const { name, description, id } = task;
  return (
    <Draggable draggableId={`task-drag-${id}`} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          shadow='sm'
          padding='lg'
          radius='md'
          withBorder
          w={300}
        >
          <Title order={5} mb={10}>
            {name}
          </Title>
          <Text size='sm' color='dimmed'>
            {description}
          </Text>
        </Card>
      )}
    </Draggable>
  );
}

export default TaskCard;

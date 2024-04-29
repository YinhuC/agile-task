import React from 'react';
import { Card, Title, Text, Flex, CardProps } from '@mantine/core';
import { Task } from '../../types/task.types';
import { Draggable } from 'react-beautiful-dnd';
import TaskModal from '../TaskModal';

type TaskCardProps = Partial<CardProps> & {
  task: Task;
  index: number;
};

function TaskCard({ task, index, ...props }: TaskCardProps) {
  const { name, description, id, category } = task;

  return (
    <Draggable draggableId={`task-drag-${id}`} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          shadow='xs'
          padding='sm'
          radius='sm'
          withBorder
          w={280}
          sx={{
            height: '100%',
            overflow: 'visible',
          }}
          {...props}
        >
          <Flex justify='space-between' align='center'>
            <Title order={5} mb={10}>
              {name}
            </Title>
            <TaskModal
              type='edit'
              categoryId={category?.id as number}
              task={task}
            />
          </Flex>
          <Text size='sm' color='dimmed'>
            {description}
          </Text>
        </Card>
      )}
    </Draggable>
  );
}

export default TaskCard;

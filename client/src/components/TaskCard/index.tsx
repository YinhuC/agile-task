import React from 'react';
import { Card, Title, Text, Flex } from '@mantine/core';
import { Task } from '../../types/task.types';
import { Draggable } from 'react-beautiful-dnd';
import TaskModal from '../TaskModal';
import { Category } from '../../types/category.types';

type TaskCardProps = {
  task: Task;
  index: number;
};

function TaskCard({ task, index }: TaskCardProps) {
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
          w={300}
        >
          <Flex justify='space-between' align='center'>
            <Title order={5} mb={10}>
              {name}
            </Title>

            <TaskModal
              type='edit'
              category={category as Category}
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

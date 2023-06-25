import React, { useEffect, useState } from 'react';
import { Divider, Stack, Title } from '@mantine/core';
import TaskCard from '../TaskCard';
import { Category } from '../../types/category.types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  FetchAllTasksPayload,
  fetchAllTasksThunk,
} from '../../store/task/task.thunks';
import { Task } from '../../types/task.types';
import { Draggable, Droppable } from 'react-beautiful-dnd';

type CategoryGridProps = {
  category: Category;
};

function CategoryGrid({ category }: CategoryGridProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { name, id, index } = category;
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    dispatch(fetchAllTasksThunk({ categoryId: id })).then((action) => {
      const payload = action.payload as FetchAllTasksPayload;
      setTasks(payload.data);
    });
  }, [dispatch, id]);

  return (
    <Draggable draggableId={`cat-drag-${id}-${index}`} index={index}>
      {(provided) => (
        <Stack
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          spacing={20}
          p={20}
          mx={10}
          sx={{
            backgroundColor: 'white',
            borderRadius: '0.2rem',
          }}
        >
          <Title order={4} ml={5}>
            {name}
          </Title>
          <Divider />
          <Droppable droppableId={`task-drop-${id}-${index}`} type='TASK'>
            {(provided) => (
              <Stack
                ref={provided.innerRef}
                {...provided.droppableProps}
                spacing={10}
              >
                {tasks.map((task, index) => (
                  <TaskCard
                    task={task}
                    index={index}
                    key={`task-card-${index}`}
                  />
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </Stack>
      )}
    </Draggable>
  );
}

export default CategoryGrid;

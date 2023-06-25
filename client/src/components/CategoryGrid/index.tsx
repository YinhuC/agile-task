import React, { useEffect, useMemo } from 'react';
import { Divider, Stack, Title } from '@mantine/core';
import TaskCard from '../TaskCard';
import { Category } from '../../types/category.types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAllTasksThunk } from '../../store/task/task.thunks';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { sortByIndex } from '../../utils/sort.utils';

type CategoryGridProps = {
  category: Category;
  index: number;
};

function CategoryGrid({ category, index }: CategoryGridProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { name, id } = category;
  const allTasks = useSelector((state: RootState) => state.tasks.tasks);

  const tasks = useMemo(
    () => sortByIndex(allTasks.filter((task) => task.category?.id === id)),
    [allTasks, id]
  );

  useEffect(() => {
    dispatch(fetchAllTasksThunk({ categoryId: id }));
  }, [dispatch, id]);

  return (
    <Draggable draggableId={`cat-drag-${id}`} index={index}>
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
          <Droppable droppableId={`task-drop-${id}`} type='TASK'>
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
                    key={`task-card-${task.id}`}
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

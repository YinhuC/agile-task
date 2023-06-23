import React, { useEffect, useMemo, useState } from 'react';
import { Divider, Stack, Title } from '@mantine/core';
import CategoryCard from '../TaskCard';
import { Category } from '../../types/category.types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  FetchAllTasksPayload,
  fetchTasksThunk,
} from '../../store/task/task.thunks';
import { Task } from '../../types/task.types';
import { Draggable } from 'react-beautiful-dnd';

type CategoryGridProps = {
  category: Category;
};

function CategoryGrid({ category }: CategoryGridProps) {
  const { name, id, index } = category;
  const dispatch = useDispatch<AppDispatch>();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    dispatch(fetchTasksThunk({ categoryId: id })).then((action) => {
      const payload = action.payload as FetchAllTasksPayload;
      setTasks(payload.data);
    });
  }, [dispatch, id]);

  const cards = useMemo(
    () =>
      tasks.map((task, index) => (
        <CategoryCard task={task} key={`task-card-${index}`} />
      )),
    [tasks]
  );

  return (
    <Draggable draggableId={`category-drop-${index}`} index={index}>
      {(provided) => (
        <Stack
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
          {cards}
        </Stack>
      )}
    </Draggable>
  );
}

export default CategoryGrid;

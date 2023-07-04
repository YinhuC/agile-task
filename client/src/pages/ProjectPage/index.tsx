import React, { useEffect } from 'react';
import { Flex, useMantineTheme } from '@mantine/core';
import {
  fetchAllCategoriesThunk,
  updateCategoryOrderThunk,
} from '../../store/category/category.thunks';
import { useLocation } from 'react-router-dom';
import CategoryGrid from '../../components/CategoryGrid';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import HeaderSection from './HeaderSection';
import { UpdateCategoryOrderParams } from '../../types/category.types';
import { UpdateTaskOrderParams } from '../../types/task.types';
import {
  fetchAllTasksThunk,
  updateTaskOrderThunk,
} from '../../store/task/task.thunks';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

function ProjectPage() {
  const theme = useMantineTheme();
  const categories = useAppSelector((state) => state.categories.categories);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const location = useLocation();
  const path = location.pathname.split('/');
  const projectId = path[path.length - 1];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk({ projectId: parseInt(projectId) }));
  }, [dispatch, projectId]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination, draggableId } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (result.type === 'CATEGORY') {
      const category: UpdateCategoryOrderParams = {
        ...categories[source.index],
        index: destination.index,
        projectId: parseInt(projectId),
      };
      dispatch(updateCategoryOrderThunk(category));

      // Still a delay even when updating local state first
      // https://github.com/atlassian/react-beautiful-dnd/issues/873
      // const updatedCategories = updateIndexValues(
      //   categories,
      //   source.index,
      //   destination.index
      // );
      // dispatch(updateAllCategories(updatedCategories));
    } else {
      const newCategoryId = parseInt(destination.droppableId.split('-')[2]);
      const oldCategoryId = parseInt(source.droppableId.split('-')[2]);
      const taskId = parseInt(draggableId.split('-')[2]);
      dispatch(fetchAllTasksThunk({ categoryId: oldCategoryId }));
      const oldTaskWithCategory = tasks.find((task) => task.id === taskId);
      if (!oldTaskWithCategory) return;
      const { category, ...oldTask } = oldTaskWithCategory;
      const newTask: UpdateTaskOrderParams = {
        ...oldTask,
        index: destination.index,
        categoryId: newCategoryId,
      };
      dispatch(updateTaskOrderThunk(newTask));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HeaderSection projectId={projectId} />
      <Droppable droppableId='cat-drop' direction='horizontal' type='CATEGORY'>
        {(provided) => (
          <Flex
            ref={provided.innerRef}
            {...provided.droppableProps}
            p={30}
            sx={{
              background: theme.colors.gray[2],
              margin: '0 50px',
              borderRadius: '0.5rem',
              overflow: 'auto',
              userSelect: 'none',
              height: '73vh',
              [theme.fn.smallerThan('lg')]: {
                margin: '0 30px',
              },
              [theme.fn.smallerThan('sm')]: {
                margin: '0 15px',
              },
            }}
          >
            {categories.map((category, index) => (
              <CategoryGrid
                projectId={parseInt(projectId)}
                category={category}
                index={index}
                key={`category-grid-${category.id}`}
              />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ProjectPage;

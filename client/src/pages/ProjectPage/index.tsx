import React, { useEffect } from 'react';
import { Flex, useMantineTheme } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  fetchAllCategoriesThunk,
  updateCategoryOrderThunk,
} from '../../store/category/category.thunks';
import { useLocation } from 'react-router-dom';
import CategoryGrid from '../../components/CategoryGrid';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import HeaderSection from './HeaderSection';
import { UpdateCategoryOrderParams } from '../../types/category.types';

function ProjectPage() {
  const theme = useMantineTheme();
  const categoryState = useSelector(
    (state: RootState) => state.categories.categories
  );
  const location = useLocation();
  const path = location.pathname.split('/');
  const projectId = path[path.length - 1];
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk({ projectId: parseInt(projectId) }));
  }, [dispatch, projectId]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const category: UpdateCategoryOrderParams = {
      ...categoryState[source.index],
      index: destination.index + 1,
      projectId: parseInt(projectId),
    };
    dispatch(updateCategoryOrderThunk(category));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <HeaderSection projectId={projectId} />
      <Droppable droppableId='board' direction='horizontal'>
        {(provided) => (
          <Flex
            {...provided.droppableProps}
            ref={provided.innerRef}
            p={20}
            sx={{
              background: '#f9f9f9',
              margin: '0 50px',
              borderRadius: '0.5rem',
              overflow: 'auto',
              userSelect: 'none',
              [theme.fn.smallerThan('lg')]: {
                margin: '0 30px',
              },
              [theme.fn.smallerThan('sm')]: {
                margin: '0 15px',
              },
            }}
          >
            {categoryState.map((category, index) => (
              <CategoryGrid
                index={index}
                category={category}
                key={`category-grid-${index}`}
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

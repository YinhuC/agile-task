import React, { useEffect, useState } from 'react';
import { Container, Title, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCategoriesThunk } from '../../store/category/category.thunks';
import { useLocation } from 'react-router-dom';
import { fetchProjectThunk } from '../../store/project/project.thunks';

function ProjectPage() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const project = useSelector((state: RootState) => state.projects.projects[0]);

  useEffect(() => {
    const path = location.pathname.split('/');
    const projectId = path[path.length - 1];
    dispatch(fetchCategoriesThunk({ projectId: parseInt(projectId) }));
    dispatch(fetchProjectThunk(projectId));
  }, [dispatch, location.pathname]);

  return (
    <Container size='lg' mb={200}>
      <Title order={2} mb={10}>
        {project?.name}
      </Title>
      <Text w='60%' ml={2}>
        {project?.description}
      </Text>
    </Container>
  );
}

export default ProjectPage;

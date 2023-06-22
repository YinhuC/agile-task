import React, { useEffect, useState } from 'react';
import { Container, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCategoriesThunk } from '../../store/category/category.thunks';
import { useLocation } from 'react-router-dom';
import { Project } from '../../types/project.types';
import {
  FetchProjectPayload,
  fetchProjectThunk,
} from '../../store/project/project.thunks';
import API from '../../api';

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
      <Title order={2}>{project?.name}</Title>
      <Title order={2}>{project?.description}</Title>
    </Container>
  );
}

export default ProjectPage;

import React, { useEffect, useMemo } from 'react';
import { Container, Title, Text, Flex, useMantineTheme } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchCategoriesThunk } from '../../store/category/category.thunks';
import { useLocation } from 'react-router-dom';
import { fetchProjectThunk } from '../../store/project/project.thunks';
import CategoryGrid from '../../components/CategoryGrid';

function ProjectPage() {
  const theme = useMantineTheme();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const project = useSelector((state: RootState) => state.projects.projects[0]);
  const categoriesData = useSelector(
    (state: RootState) => state.categories.categories
  );

  useEffect(() => {
    const path = location.pathname.split('/');
    const projectId = path[path.length - 1];
    dispatch(fetchCategoriesThunk({ projectId: parseInt(projectId) }));
    dispatch(fetchProjectThunk(projectId));
  }, [dispatch, location.pathname]);

  const categories = useMemo(
    () =>
      categoriesData.map((category, index) => (
        <CategoryGrid category={category} key={`category-grid-${index}`} />
      )),
    [categoriesData]
  );

  return (
    <>
      <Container size='xl' mb={20}>
        <Title order={2} mb={10}>
          {project?.name}
        </Title>
        <Text w='60%' ml={2}>
          {project?.description}
        </Text>
      </Container>
      <Flex
        p={20}
        sx={{
          background: '#f9f9f9',
          margin: '0 50px',
          borderRadius: '0.5rem',
          overflow: 'auto',
          [theme.fn.smallerThan('lg')]: {
            margin: '0 30px',
          },
          [theme.fn.smallerThan('sm')]: {
            margin: '0 15px',
          },
        }}
      >
        {categories}
      </Flex>
    </>
  );
}

export default ProjectPage;

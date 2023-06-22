import React, { useEffect } from 'react';
import { Container, Title } from '@mantine/core';
import ProjectGrid from '../../components/ProjectGrid';
import ProjectCard from '../../components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchGroupsThunk } from '../../store/group/group.thunks';

function BoardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const groups = useSelector((state: RootState) => state.groups.groups);
  console.log(groups);

  useEffect(() => {
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  return (
    <Container size='lg'>
      <Title order={2} mb={30}>
        Workspaces
      </Title>
      <ProjectGrid groupName={'Group Name'}>
        <ProjectCard
          title={'Project 1'}
          description={'Here is description'}
          link={'/'}
        />
        <ProjectCard
          title={'Project 1'}
          description={'Here is description'}
          link={'/'}
        />
        <ProjectCard
          title={'Project 1'}
          description={'Here is description'}
          link={'/'}
        />
      </ProjectGrid>
    </Container>
  );
}

export default BoardPage;

import React from 'react';
import { Container, Title } from '@mantine/core';
import ProjectGrid from '../../components/ProjectGrid';
import ProjectCard from '../../components/ProjectCard';
import { getGroups } from '../../api/group.api';

function BoardPage() {
  const groups = getGroups();
  console.log(groups);
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

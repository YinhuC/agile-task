import React from 'react';
import { Container, Title } from '@mantine/core';
import ProjectGrid from '../../components/ProjectGrid';
import ProjectCard from '../../components/ProjectCard';

function BoardPage() {
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

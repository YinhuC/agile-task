import React, { useCallback, useEffect, useMemo } from 'react';
import { Container, Title } from '@mantine/core';
import ProjectGrid from '../../components/ProjectGrid';
import ProjectCard from '../../components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchGroupsThunk } from '../../store/group/group.thunks';
import { Project } from '../../types/project.types';

function BoardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.groups.groups);

  useEffect(() => {
    dispatch(fetchGroupsThunk());
  }, [dispatch]);

  const cards = useCallback(
    (projects: Project[] | undefined) =>
      projects && !(projects.length === 0) ? (
        projects.map((project, index) => (
          <ProjectCard
            title={project.name}
            description={project?.description}
            link={'/'}
            key={`project-card-${index}`}
          />
        ))
      ) : (
        <ProjectCard
          title={'No Projects'}
          description={'Click here to create one and get started'}
          link={'/'}
        />
      ),
    []
  );

  const boards = useMemo(
    () =>
      groups &&
      groups.map((group, index) => (
        <ProjectGrid groupName={group.name} key={`project-grid-${index}`}>
          {cards(group.projects)}
        </ProjectGrid>
      )),

    [cards, groups]
  );

  return (
    <Container size='lg' mb={200}>
      <Title order={2}>Workspaces</Title>
      {boards}
    </Container>
  );
}

export default BoardPage;

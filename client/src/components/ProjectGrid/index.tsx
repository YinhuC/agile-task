import React, { useEffect, useMemo } from 'react';
import { Title, SimpleGrid, Stack, Flex } from '@mantine/core';
import ProjectCard from '../ProjectCard';
import { Group } from '../../types/group.types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAllProjectsThunk } from '../../store/project/project.thunks';
import ProjectModal from '../ProjectModal';

type ProjectGridProps = {
  group: Group;
};

function ProjectGrid({ group }: ProjectGridProps) {
  const { name, id } = group;
  const dispatch = useDispatch<AppDispatch>();
  const allProjects = useSelector(
    (state: RootState) => state.projects.projects
  );

  const projects = useMemo(
    () => allProjects.filter((project) => project.group?.id === id),
    [allProjects, id]
  );

  useEffect(() => {
    dispatch(fetchAllProjectsThunk({ groupId: id }));
  }, [dispatch, id]);

  const cards = useMemo(
    () =>
      projects.length === 0 ? (
        <></>
      ) : (
        projects.map((project, index) => (
          <ProjectCard
            project={project}
            groupId={id}
            key={`project-card-${index}`}
          />
        ))
      ),

    [id, projects]
  );

  return (
    <Stack mb={50}>
      <Flex justify='space-between' align='center' mb={10}>
        <Title order={3} mb={8}>
          {name}
        </Title>
        <ProjectModal groupId={id} type='add' />
      </Flex>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: '62rem', cols: 3, spacing: 'md' },
          { maxWidth: '48rem', cols: 2, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {cards}
      </SimpleGrid>
    </Stack>
  );
}

export default ProjectGrid;

import React, { useEffect, useMemo, useState } from 'react';
import { Title, SimpleGrid, Stack } from '@mantine/core';
import ProjectCard from '../ProjectCard';
import { Group } from '../../types/group.types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  FetchProjectsPayload,
  fetchProjectsThunk,
} from '../../store/project/project.thunks';
import { Project } from '../../types/project.types';

type ProjectGridProps = {
  group: Group;
};

function ProjectGrid({ group }: ProjectGridProps) {
  const { name, id } = group;
  const dispatch = useDispatch<AppDispatch>();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    dispatch(fetchProjectsThunk({ groupId: id })).then((action) => {
      const payload = action.payload as FetchProjectsPayload;
      setProjects(payload.data);
    });
  }, [dispatch, id]);

  const cards = useMemo(() => {
    const cards = projects.map((project, index) => (
      <ProjectCard
        title={project.name}
        description={project?.description}
        link={'/'}
        key={`project-card-${index}`}
      />
    ));
    if (projects.length === 0)
      return (
        <ProjectCard
          title={'No Projects'}
          description={'Click here to create one and get started'}
          link={'/'}
        />
      );
    return cards;
  }, [projects]);

  return (
    <Stack mb={50}>
      <Title order={3}>{name}</Title>
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

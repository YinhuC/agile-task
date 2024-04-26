import React, { useEffect, useMemo } from 'react';
import {
  Title,
  SimpleGrid,
  Stack,
  Flex,
  useMantineTheme,
  StackProps,
} from '@mantine/core';
import ProjectCard from '../ProjectCard';
import { Group } from '../../types/group.types';
import { fetchAllProjectsThunk } from '../../store/project/project.thunks';
import ProjectModal from '../ProjectModal';
import GroupModal from '../GroupModal';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

type ProjectGridProps = StackProps & {
  group: Group;
};

function ProjectGrid({ group, ...props }: ProjectGridProps) {
  const theme = useMantineTheme();
  const { name, id } = group;
  const dispatch = useAppDispatch();
  const allProjects = useAppSelector((state) => state.projects.projects);

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
    <Stack
      {...props}
      mb={40}
      px={40}
      pt={30}
      pb={40}
      sx={{ backgroundColor: theme.colors.gray[0], borderRadius: '0.3rem' }}
    >
      <Flex
        justify='space-between'
        align='center'
        mb={10}
        sx={{
          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <Flex align='center'>
          <Title order={3} mx={5} weight={500}>
            {name}
          </Title>
          <GroupModal type='edit' group={group} />
        </Flex>
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

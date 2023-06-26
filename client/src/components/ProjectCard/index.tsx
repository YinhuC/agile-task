import React from 'react';
import { Card, Text, Title, Button, Box, Flex } from '@mantine/core';
import { Link } from 'react-router-dom';
import ProjectModal from '../ProjectModal';
import { Project } from '../../types/project.types';
import { Group } from '../../types/group.types';

type ProjectCardProps = {
  project: Project;
  group: Group;
};

function ProjectCard({ project, group }: ProjectCardProps) {
  const { name, description, id } = project;

  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      withBorder
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Flex justify='space-between'>
          <Title order={4} weight={500} mb={10}>
            {name}
          </Title>
          <ProjectModal group={group} type='edit' project={project} />
        </Flex>
        <Text mb={15}>{description}</Text>
      </Box>
      <Button
        component={Link}
        variant='light'
        color='blue'
        fullWidth
        to={`/project/${id}`}
      >
        View Project
      </Button>
    </Card>
  );
}

export default ProjectCard;

import React from 'react';
import {
  Card,
  Text,
  Title,
  Button,
  Box,
  Flex,
  CardProps,
  useMantineTheme,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import ProjectModal from '../ProjectModal';
import { Project } from '../../types/project.types';

type ProjectCardProps = Partial<CardProps> & {
  project: Project;
  groupId: number;
};

function ProjectCard({ project, groupId, ...props }: ProjectCardProps) {
  const { name, description, id } = project;
  const theme = useMantineTheme();

  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='sm'
      withBorder
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      {...props}
    >
      <Box>
        <Flex justify='space-between'>
          <Title order={3} mb={10}>
            {name}
          </Title>
          <ProjectModal groupId={groupId} type='edit' project={project} />
        </Flex>
        <Text mb={15} color={theme.colors.gray[6]} size='sm'>
          {description}
        </Text>
      </Box>
      <Button
        component={Link}
        variant='light'
        color='blue'
        fullWidth
        to={`/project/${id}`}
        aria-label='View Project'
      >
        View Project
      </Button>
    </Card>
  );
}

export default ProjectCard;

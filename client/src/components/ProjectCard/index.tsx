import React from 'react';
import { Card, Text, Title, Button, Box } from '@mantine/core';
import { Link } from 'react-router-dom';

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
};

function ProjectCard({ title, description, link }: ProjectCardProps) {
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
        <Title order={4} weight={500} mb={10}>
          {title}
        </Title>
        <Text mb={15}>{description}</Text>
      </Box>
      <Button component={Link} variant='light' color='blue' fullWidth to={link}>
        View Project
      </Button>
    </Card>
  );
}

export default ProjectCard;

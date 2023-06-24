import React, { useEffect } from 'react';
import { Container, Title, Text } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { fetchProjectThunk } from '../../../store/project/project.thunks';

type HeaderSectionProps = {
  projectId: string;
};

function HeaderSection({ projectId }: HeaderSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector((state: RootState) => state.projects.projects[0]);

  useEffect(() => {
    dispatch(fetchProjectThunk(projectId));
  }, [dispatch, projectId]);

  return (
    <Container
      size='xl'
      mb={30}
      px={40}
      sx={{
        userSelect: 'none',
      }}
    >
      <Title order={2} mb={10}>
        {project?.name}
      </Title>
      <Text w='60%' ml={2}>
        {project?.description}
      </Text>
    </Container>
  );
}

export default HeaderSection;

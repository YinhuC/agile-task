import React, { useEffect } from 'react';
import { Container, Title, Text, Flex, Box } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { fetchProjectThunk } from '../../../store/project/project.thunks';
import CategoryModal from '../../../components/CategoryModal';

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
      <Flex justify='space-between' align='end'>
        <Box>
          <Title order={2} mb={10}>
            {project?.name}
          </Title>
          <Text w='60%' ml={2}>
            {project?.description}
          </Text>
        </Box>
        <CategoryModal type='add' projectId={project?.id} />
      </Flex>
    </Container>
  );
}

export default HeaderSection;

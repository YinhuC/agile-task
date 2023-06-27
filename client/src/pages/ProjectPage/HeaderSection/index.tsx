import React, { useEffect, useMemo } from 'react';
import {
  Container,
  Title,
  Text,
  Flex,
  Box,
  useMantineTheme,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { fetchProjectThunk } from '../../../store/project/project.thunks';
import CategoryModal from '../../../components/CategoryModal';

type HeaderSectionProps = {
  projectId: string;
};

function HeaderSection({ projectId }: HeaderSectionProps) {
  const theme = useMantineTheme();
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.projects.projects);

  const project = useMemo(
    () => projects.find((project) => project.id === parseInt(projectId)),
    [projectId, projects]
  );

  useEffect(() => {
    dispatch(fetchProjectThunk(projectId));
  }, [dispatch, projectId]);

  return (
    <Container
      size='xl'
      mt={20}
      mb={30}
      px={40}
      sx={{
        userSelect: 'none',
      }}
    >
      <Flex
        justify='space-between'
        sx={{
          alignItems: 'end',
          [theme.fn.smallerThan('sm')]: {
            flexDirection: 'column',
            alignItems: 'start',
          },
        }}
      >
        <Box mr={50}>
          <Title order={2} mb={10}>
            {project?.name}
          </Title>
          <Text ml={2}>{project?.description}</Text>
        </Box>
        {project && <CategoryModal type='add' projectId={project.id} />}
      </Flex>
    </Container>
  );
}

export default HeaderSection;

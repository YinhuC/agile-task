import React, { useEffect, useMemo } from 'react';
import { Box, Container, Flex, Title, useMantineTheme } from '@mantine/core';
import ProjectGrid from '../../components/ProjectGrid';
import { fetchAllGroupsThunk } from '../../store/group/group.thunks';
import GroupModal from '../../components/GroupModal';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

function BoardPage() {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groups.groups);

  useEffect(() => {
    dispatch(fetchAllGroupsThunk());
  }, [dispatch]);

  const grids = useMemo(
    () =>
      groups ? (
        groups.map((group, index) => (
          <ProjectGrid group={group} key={`project-grid-${index}`} />
        ))
      ) : (
        <></>
      ),
    [groups]
  );

  return (
    <Box py={30}>
      <Container size='xl'>
        <Flex
          justify='space-between'
          align='start'
          mb={20}
          mx={40}
          sx={{
            [theme.fn.smallerThan('sm')]: {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <Title order={2}>Workspaces</Title>
          <GroupModal type='add' />
        </Flex>
        {grids}
      </Container>
    </Box>
  );
}

export default BoardPage;

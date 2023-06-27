import React, { useEffect, useMemo } from 'react';
import { Box, Container, Flex, Title } from '@mantine/core';
import ProjectGrid from '../../components/ProjectGrid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAllGroupsThunk } from '../../store/group/group.thunks';
import GroupModal from '../../components/GroupModal';

function BoardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.groups.groups);

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
    <Box py={40}>
      <Container size='xl'>
        <Flex justify='space-between' align='start' mb={10} mx={50}>
          <Title order={2} mb={30}>
            Workspaces
          </Title>
          <GroupModal type='add' />
        </Flex>
        {grids}
      </Container>
    </Box>
  );
}

export default BoardPage;

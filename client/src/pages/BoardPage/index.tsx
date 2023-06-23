import React, { useEffect, useMemo } from 'react';
import { Container, Title } from '@mantine/core';
import ProjectGrid from '../../components/ProjectGrid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchAllGroupsThunk } from '../../store/group/group.thunks';

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
    <Container size='lg'>
      <Title order={2} mb={30}>
        Workspaces
      </Title>
      {grids}
    </Container>
  );
}

export default BoardPage;

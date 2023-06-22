import React, { ReactNode } from 'react';
import { Title, SimpleGrid } from '@mantine/core';

type ProjectGridProps = {
  children: ReactNode;
  groupName: string;
};

function ProjectGrid({ children, groupName }: ProjectGridProps) {
  return (
    <>
      <Title order={3} mb={20} mt={50}>
        {groupName}
      </Title>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: '62rem', cols: 3, spacing: 'md' },
          { maxWidth: '48rem', cols: 2, spacing: 'sm' },
          { maxWidth: '36rem', cols: 1, spacing: 'sm' },
        ]}
      >
        {children}
      </SimpleGrid>
    </>
  );
}

export default ProjectGrid;

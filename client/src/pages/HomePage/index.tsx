import React from 'react';

import HeaderSection from './HeaderSection';
import GuideSection from './GuideSection';
import { Box } from '@mantine/core';

function HomePage() {
  return (
    <Box mt={-80}>
      <HeaderSection />
      <GuideSection />
    </Box>
  );
}

export default HomePage;

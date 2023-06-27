import React from 'react';

import HeaderSection from './HeaderSection';
import GuideSection from './GuideSection';
import { Box, useMantineTheme } from '@mantine/core';

function HomePage() {
  const theme = useMantineTheme();

  return (
    <Box mt={-80} pt={80} sx={{ backgroundColor: theme.colors.gray[1] }}>
      <HeaderSection />
      <GuideSection />
    </Box>
  );
}

export default HomePage;

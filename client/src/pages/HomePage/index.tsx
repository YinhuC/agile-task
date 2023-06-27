import React from 'react';
import { Box } from '@mantine/core';

import HeaderSection from './HeaderSection';
import GuideSection from './PhoneSection';
import LaptopSection from './LaptopSection';

function HomePage() {
  return (
    <Box mt={-80}>
      <HeaderSection />
      <LaptopSection />
      <GuideSection />
    </Box>
  );
}

export default HomePage;

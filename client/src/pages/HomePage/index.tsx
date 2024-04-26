import React from 'react';
import { Box } from '@mantine/core';

import HeaderSection from './HeaderSection';
import GuideSection from './PhoneSection';
import LaptopSection from './LaptopSection';
import ComponentSection from './ComponentSection';
import ViewSection from './ViewSection';
import PriceSection from './PriceSection';
import FeatureSection from './FeatureSection';

function HomePage() {
  return (
    <Box mt={-80}>
      <HeaderSection />
      <LaptopSection />
      <GuideSection />
      <FeatureSection />
      <ViewSection />
      <ComponentSection />
      <PriceSection />
    </Box>
  );
}

export default HomePage;

import React from 'react';
import { Box } from '@mantine/core';

import HeaderSection from './HeaderSection';
import GuideSection from './PhoneSection';
import LaptopSection from './LaptopSection';
import ComponentSection from './ComponentSection';
import ViewSection from './ViewSection';
import PriceSection from './PriceSection';
import FeatureSection from './FeatureSection';
import Footer from '../../components/Footer';

function HomePage() {
  return (
    <Box>
      <HeaderSection />
      <LaptopSection />
      <GuideSection />
      <FeatureSection />
      <ViewSection />
      <ComponentSection />
      <PriceSection />
      <Footer />
    </Box>
  );
}

export default HomePage;

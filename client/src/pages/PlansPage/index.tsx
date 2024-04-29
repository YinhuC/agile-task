import React from 'react';
import {
  Container,
  Box,
  useMantineTheme,
  Title,
  Button,
  Stack,
} from '@mantine/core';
import Footer from '../../components/Footer';
import PriceSection from './PriceSection';
import AccordionSection from './AccordionSection';

function PlansPage() {
  const theme = useMantineTheme();
  return (
    <>
      <PriceSection />
      <AccordionSection />
      <Box
        sx={{
          background: theme.fn.linearGradient(
            180,
            theme.colors.pink[0],
            '#fff'
          ),
        }}
      >
        <Container size='lg' py={80}>
          <Stack>
            <Title order={2} weight={500} mb={5} align='center'>
              Didn't find what you were after?
            </Title>
            <Button m='auto' size='md'>
              Make a suggestion
            </Button>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default PlansPage;

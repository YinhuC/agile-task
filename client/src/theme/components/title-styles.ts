import { MantineThemeOverride } from '@mantine/core';

export const sizes = {
  h1: {
    fontSize: '2.5rem',
  },
  h2: {
    fontSize: '2rem',
  },
  h3: {
    fontSize: '1.5rem',
  },
  h4: {
    fontSize: '1.25rem',
  },
  h5: {
    fontSize: '1rem',
  },
  h6: {
    fontSize: '0.875rem',
  },
};

export const title: MantineThemeOverride['components'] = {
  Title: {
    styles: (theme) => ({
      root: {
        lineHeight: '120%',
      },
    }),
  },
};

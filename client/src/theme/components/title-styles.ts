import { MantineThemeOverride } from '@mantine/core';

export const sizes = {
  h1: {
    fontSize: '3rem',
  },
  h2: {
    fontSize: '2.25rem',
  },
  h3: {
    fontSize: '1.75rem',
  },
  h4: {
    fontSize: '1.5rem',
  },
  h5: {
    fontSize: '1.25rem',
  },
  h6: {
    fontSize: '1rem',
  },
};

export const title: MantineThemeOverride['components'] = {
  Title: {
    styles: (theme) => ({
      root: {
        fontWeight: 400,
        lineHeight: '120%',
      },
    }),
  },
};

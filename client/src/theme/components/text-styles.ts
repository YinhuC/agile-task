import { MantineThemeOverride } from '@mantine/core';

export const text: MantineThemeOverride['components'] = {
  Text: {
    styles: (theme) => ({
      root: {
        color: '#6B6F76',
      },
    }),
  },
};

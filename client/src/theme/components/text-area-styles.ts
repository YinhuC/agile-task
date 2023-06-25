import { MantineThemeOverride } from '@mantine/core';

export const textarea: MantineThemeOverride['components'] = {
  Textarea: {
    styles: (theme) => ({
      label: {
        marginBottom: 6,
        color: '#6B6F76',
      },
      input: {
        padding: 20,
      },
    }),
  },
};

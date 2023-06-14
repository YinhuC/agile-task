import { MantineThemeOverride } from '@mantine/core';

export const textInput: MantineThemeOverride['components'] = {
  TextInput: {
    styles: (theme) => ({
      label: {
        marginBottom: 10,
        color: '#6B6F76',
      },
      input: {
        padding: 20,
      },
    }),
  },
};

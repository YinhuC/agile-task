import { MantineThemeOverride } from '@mantine/core';

export const passwordInput: MantineThemeOverride['components'] = {
  PasswordInput: {
    styles: (theme) => ({
      label: {
        marginBottom: 10,
        color: '#6B6F76',
      },
      innerInput: {
        padding: 18,
      },
      input: {
        padding: 20,
      },
    }),
  },
};

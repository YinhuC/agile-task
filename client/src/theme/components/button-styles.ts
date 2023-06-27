import { MantineThemeOverride } from '@mantine/core';

export const button: MantineThemeOverride['components'] = {
  Button: {
    styles: (theme) => ({
      root: {
        fontWeight: 500,
      },
    }),
    variants: {
      light: (theme) => ({
        root: {
          backgroundColor: theme.colors.pink[0],
          color: theme.colors.pink[7],
          fontSize: 14,
          '&:hover': {
            backgroundColor: `${theme.colors.pink[1]} !important`,
          },
        },
      }),
    },
  },
};

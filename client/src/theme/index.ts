import { MantineThemeOverride } from '@mantine/core';
import { sizes, title } from './components/title-styles';
import { text } from './components/text-styles';
import { textInput } from './components/text-input-styles';
import { passwordInput } from './components/password-input-styles';
import { textarea } from './components/text-area-styles';

import './styles/fonts.css';
import './styles/body.css';
import { button } from './components/button-styles';

const projectTheme: MantineThemeOverride = {
  breakpoints: {
    xxs: '24em',
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },
  colorScheme: 'light',
  fontFamily: 'Inter, Arial, Helvetica, sans-serif',
  lineHeight: '120%',
  primaryColor: 'pink',
  headings: {
    fontFamily: 'Playfair Display, Gerigia, serif',
    sizes: sizes,
    fontWeight: 400,
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },
  components: {
    ...title,
    ...text,
    ...textInput,
    ...passwordInput,
    ...textarea,
    ...button,
  },
};

export default projectTheme;

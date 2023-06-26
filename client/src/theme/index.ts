import { MantineThemeOverride } from '@mantine/core';
import { sizes, title } from './components/title-styles';
import { text } from './components/text-styles';
import { textInput } from './components/text-input-styles';
import { passwordInput } from './components/password-input-styles';
import './styles/fonts.css';
import { textarea } from './components/text-area-styles';

const projectTheme: MantineThemeOverride = {
  colorScheme: 'light',
  fontFamily: 'Inter, Arial, Helvetica, sans-serif',
  lineHeight: '120%',
  headings: {
    fontFamily: 'Playfair Display, Gerigia, serif',
    sizes: sizes,
    fontWeight: 400,
  },
  components: {
    ...title,
    ...text,
    ...textInput,
    ...passwordInput,
    ...textarea,
  },
};

export default projectTheme;

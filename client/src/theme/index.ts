import { MantineThemeOverride } from '@mantine/core';
import '../styles/fonts.css';
import { sizes, title } from './components/title-styles';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  fontFamily: 'Inter, Arial, Helvetica, sans-serif',
  lineHeight: '120%',
  headings: {
    fontFamily: 'Playfair Display, Gerigia, serif',
    sizes: sizes,
    fontWeight: 400,
  },
  components: { ...title },
};

export default theme;

import { MantineThemeOverride } from '@mantine/core';
import '../styles/fonts.css';
import { sizes, title } from './components/title-styles';
import { text } from './components/text-styles';

const theme: MantineThemeOverride = {
  colorScheme: 'light',
  fontFamily: 'Inter, Arial, Helvetica, sans-serif',
  lineHeight: '120%',
  headings: {
    fontFamily: 'Playfair Display, Gerigia, serif',
    sizes: sizes,
    fontWeight: 400,
  },
  components: { ...title, ...text },
};

export default theme;

// text - #6B6F76
// light gray #F9F9F9
// red #da3458
// gold #B59978
// light blue #7894B5

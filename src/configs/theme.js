import { extendTheme } from '@chakra-ui/react';

// 2. Call `extendTheme` and pass your custom values
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
const theme = extendTheme({
  fonts: {
    heading: `'Be Vietnam Pro', sans-serif`,
    body: `'Be Vietnam Pro', sans-serif`,
  },
  colors: {
    brand: {
      primary: '#0f0f0f',
      secondary: '#161616',
      highlight: '#444655',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.primary',
      },
    },
  },
  config,
});

export default theme;

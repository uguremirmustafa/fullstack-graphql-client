import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';

function App({ Component }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component />
    </ChakraProvider>
  );
}

export default App;

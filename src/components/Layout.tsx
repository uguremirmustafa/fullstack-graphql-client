import { Box } from '@chakra-ui/react';
import React, { ReactChild, ReactNode } from 'react';
import { Navbar } from './Navbar';

interface Props {
  children: ReactNode | ReactChild;
}

export const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Navbar />
      <Box as="main" maxW="800px" mx="auto" w="full" px="4" pb="4">
        {children}
      </Box>
    </Box>
  );
};

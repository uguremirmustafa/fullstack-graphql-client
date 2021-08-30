import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

interface IProps {
  variant?: 'small' | 'regular';
}

const Wrapper: FC<IProps> = ({ children, variant = 'regular' }) => {
  return (
    <Box mt={8} mx="auto" w="100%" maxW={variant === 'regular' ? '800px' : '400px'}>
      {children}
    </Box>
  );
};

export default Wrapper;

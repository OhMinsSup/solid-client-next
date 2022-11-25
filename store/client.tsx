'use client';
import React from 'react';
import { SSRProvider } from 'react-aria';
import { SWRConfig } from 'swr';

interface ContextProps {
  children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
  return (
    <SWRConfig>
      <SSRProvider>{children}</SSRProvider>
    </SWRConfig>
  );
};

export default Context;

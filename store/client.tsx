'use client';
import React, { useMemo } from 'react';
import { SSRProvider } from 'react-aria';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ContextProps {
  children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <SSRProvider>{children}</SSRProvider>
    </QueryClientProvider>
  );
};

export default Context;

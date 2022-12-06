import React, { useMemo } from 'react';
import Query from './query';
import Client from './client';
import { QueryClient, dehydrate } from '@tanstack/query-core';

interface ContextProps {
  children: React.ReactNode;
}

const Provider: React.FC<ContextProps> = ({ children }) => {
  const queryClient = new QueryClient();

  const provider = (
    <Query dehydratedState={dehydrate(queryClient)}>
      <Client>{children}</Client>
    </Query>
  );

  queryClient.clear();

  return provider;
};

export default Provider;

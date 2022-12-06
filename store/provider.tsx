import React, { useMemo } from 'react';
import Query from './query';
import Client from './client';
import { QueryClient, dehydrate } from '@tanstack/query-core';

interface ProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  const queryClient = new QueryClient();

  const provider = (
    <Client>
      <Query dehydratedState={dehydrate(queryClient)}>{children}</Query>
    </Client>
  );

  queryClient.clear();

  return provider;
}

export default Provider;

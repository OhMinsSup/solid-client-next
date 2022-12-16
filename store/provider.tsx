import React, { useMemo } from 'react';
import Query from './query';
import Client, { type ClientProps } from './client';
import { QueryClient, dehydrate } from '@tanstack/query-core';

interface ProviderProps
  extends Pick<ClientProps, 'currentProfile' | 'isLoggedIn'> {
  children: React.ReactNode;
}

function Provider({ children, ...otherProps }: ProviderProps) {
  const queryClient = new QueryClient();

  const provider = (
    <Client {...otherProps}>
      <Query dehydratedState={dehydrate(queryClient)}>{children}</Query>
    </Client>
  );

  queryClient.clear();

  return provider;
}

export default Provider;

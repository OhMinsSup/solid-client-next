'use client';

import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  DehydratedState,
} from '@tanstack/react-query';
import Script from 'next/script';

interface QueryProps {
  dehydratedState: DehydratedState;
  children: React.ReactNode;
}

function Query({ dehydratedState, children }: QueryProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </QueryClientProvider>
      <Script id="react-query">
        {`window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}`}
      </Script>
    </>
  );
}

export default Query;

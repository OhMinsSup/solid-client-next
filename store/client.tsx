'use client';
import React, { useMemo } from 'react';
import { SSRProvider } from 'react-aria';
import {
  AuthProvider,
  useCreateAuthStore,
  type AuthStore,
} from './useAuthStore';

export interface ClientProps
  extends Pick<AuthStore, 'isLoggedIn' | 'currentProfile'> {
  children: React.ReactNode;
}

function Client({ children, ...otherProps }: ClientProps) {
  const store: Pick<AuthStore, 'isLoggedIn' | 'currentProfile'> = {
    ...(otherProps ?? {
      isLoggedIn: false,
      currentProfile: null,
    }),
  };

  const createAuthStore = useCreateAuthStore(store);

  return (
    <AuthProvider createStore={createAuthStore}>
      <SSRProvider>{children}</SSRProvider>
    </AuthProvider>
  );
}

export default Client;

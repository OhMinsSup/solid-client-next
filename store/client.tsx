'use client';
import React, { useMemo } from 'react';
import { SSRProvider } from 'react-aria';

interface ClientProps {
  children: React.ReactNode;
}

function Client({ children }: ClientProps) {
  return <SSRProvider>{children}</SSRProvider>;
}

export default Client;

'use client';
import React, { useMemo } from 'react';
import { SSRProvider } from 'react-aria';

interface ClientProps {
  children: React.ReactNode;
}

const Client: React.FC<ClientProps> = ({ children }) => {
  return <SSRProvider>{children}</SSRProvider>;
};

export default Client;

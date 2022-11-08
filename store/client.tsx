'use client';
import React from 'react';

import { SWRConfig } from 'swr';

interface ContextProps {
  children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
  return <SWRConfig>{children}</SWRConfig>;
};

export default Context;

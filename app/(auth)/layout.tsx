import React from 'react';
import { AuthTemplate } from '@components/auth';

export default function AuthLayout({ children }: React.PropsWithChildren<any>) {
  return <AuthTemplate>{children}</AuthTemplate>;
}

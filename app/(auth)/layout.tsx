import React from 'react';
import AuthTemplate from '@components/auth/AuthTemplate';

export default function AuthLayout({ children }: React.PropsWithChildren<any>) {
  return <AuthTemplate>{children}</AuthTemplate>;
}

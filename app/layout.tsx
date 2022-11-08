import '@assets/css/globals.css';
import React from 'react';

// components
import { DefaultSeo } from '@components/ui/Seo';
import ClientProvider from '@store/client';

export default function RootLayout({ children }: React.PropsWithChildren<any>) {
  return (
    <ClientProvider>
      <html>
        <meta charSet="utf-8" />
        <DefaultSeo />
        <body className="bg-white leading-6">{children}</body>
      </html>
    </ClientProvider>
  );
}

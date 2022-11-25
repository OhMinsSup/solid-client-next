import '@assets/css/globals.css';
import React from 'react';

// components
import ClientProvider from '@store/client';

export default function RootLayout({ children }: React.PropsWithChildren<any>) {
  return (
    <ClientProvider>
      <html>
        <body className="bg-white leading-6">{children}</body>
      </html>
    </ClientProvider>
  );
}

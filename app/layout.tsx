import '@assets/css/globals.css';
import React from 'react';

// components
import Provider from '@store/provider';

export default function RootLayout({ children }: React.PropsWithChildren<any>) {
  return (
    <html>
      <body className="bg-white leading-6">
        <Provider>{children} </Provider>
      </body>
    </html>
  );
}

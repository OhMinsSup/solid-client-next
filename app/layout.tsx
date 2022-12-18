import '@assets/css/globals.css';
import 'rc-drawer/assets/index.css';
import React from 'react';
import { cookies } from 'next/headers';
import { withCookie } from '@api/client';

// api
import { getUserInfoApi } from '@api/user';

// components
import Provider from '@store/provider';

import type { UserRespSchema } from '@api/schema/resp';

export default async function RootLayout({
  children,
}: React.PropsWithChildren<any>) {
  const nextCookies = cookies();

  const access_token = nextCookies.get('access_token');

  let profile: UserRespSchema | null = null;

  if (access_token?.value) {
    try {
      const { result } = await withCookie(
        () => getUserInfoApi(),
        nextCookies,
        true,
      );
      profile = result.result;
    } catch (error) {
      profile = null;
    }
  }

  return (
    <html>
      <body className="bg-white leading-6">
        <Provider currentProfile={profile} isLoggedIn={!!access_token?.value}>
          {children}
        </Provider>
      </body>
    </html>
  );
}

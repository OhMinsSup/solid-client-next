import React from 'react';
import { cookies } from 'next/headers';

import { withCookie } from '@api/client';
import { getUserInfoApi } from '@api/user';

import MainTemplate from '@components/main/MainTemplate';

// types
import type { UserRespSchema } from '@api/schema/resp';

export default function Page() {
  // const nextCookies = cookies();

  // const access_token = nextCookies.get('access_token');

  // let profile: UserRespSchema | null = null;

  // if (access_token) {
  //   try {
  //     const { result } = await withCookie(
  //       () => getUserInfoApi(),
  //       nextCookies,
  //       true,
  //     );
  //     profile = result.result;
  //   } catch (error) {
  //     profile = null;
  //   }
  // }

  return <MainTemplate>메인</MainTemplate>;
}

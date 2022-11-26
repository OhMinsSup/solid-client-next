import React from 'react';
import { cookies } from 'next/headers';

import { withCookie } from '@api/client';
import { getUserInfoApi } from '@api/user';

import MainTemplate from '@components/main/MainTemplate';

// types
import type { UserRespSchema } from '@api/schema/resp';
import { getTagsApi } from '@api/tags';

export default async function Page() {
  const nextCookies = cookies();

  const access_token = nextCookies.get('access_token');

  let profile: UserRespSchema | null = null;

  if (access_token) {
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

  const { result } = await getTagsApi({ limit: 5 });

  const tags = result?.result?.list ?? [];

  return <MainTemplate tags={tags}>메인</MainTemplate>;
}

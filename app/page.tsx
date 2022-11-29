import React from 'react';
import { cookies } from 'next/headers';

import { withCookie } from '@api/client';
import { getUserInfoApi } from '@api/user';

import MainTemplate from '@components/main/MainTemplate';

// types
import { getTagsApi } from '@api/tags';
import { Serialize } from '@libs/serialize/serialize';

import type {
  ListRespSchema,
  SimpleTrendingPostsRespSchema,
  TagWithPostCountSchema,
  UserRespSchema,
} from '@api/schema/resp';
import { getSimpleTrendingPostsApi } from '@api/post';

export default async function Page({
  searchParams,
}: {
  params?: any;
  searchParams?: any;
}) {
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

  const respTags = await getTagsApi({ limit: 5 });

  const t1 = Serialize.default<ListRespSchema<TagWithPostCountSchema>>({
    data: respTags,
  });

  const tags = t1?.list ?? [];

  const respTrending = await getSimpleTrendingPostsApi({
    dateType: searchParams?.dateType || '1W',
  });

  const t2 = Serialize.default<SimpleTrendingPostsRespSchema>({
    data: respTrending,
  });

  const trending = t2?.list ?? [];

  return (
    <MainTemplate tags={tags} postList={trending}>
      메인
    </MainTemplate>
  );
}

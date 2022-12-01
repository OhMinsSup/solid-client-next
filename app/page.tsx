import React from 'react';
import { cookies } from 'next/headers';
import MainTemplate from '@components/main/MainTemplate';
import { withCookie } from '@api/client';

import { getUserInfoApi } from '@api/user';
import { getPostsListApi, getSimpleTrendingPostsApi } from '@api/post';
import { getTagsApi } from '@api/tags';

// types
import { Serialize } from '@libs/serialize/serialize';

import type {
  ListRespSchema,
  SimpleTrendingPostsRespSchema,
  TagWithPostCountSchema,
  UserRespSchema,
} from '@api/schema/resp';
import MainContents from '@components/main/MainContents';

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

  const respTrending = await getSimpleTrendingPostsApi({
    dateType: '1W',
  });

  const respPosts = await getPostsListApi({
    cursor: undefined,
    limit: 25,
  });

  return (
    <MainTemplate
      tags={
        Serialize.default<ListRespSchema<TagWithPostCountSchema>>({
          data: respTags,
        })?.list ?? []
      }
      postList={
        Serialize.default<SimpleTrendingPostsRespSchema>({
          data: respTrending,
        })?.list ?? []
      }
    >
      <MainContents
        postList={Serialize.default({
          data: respPosts,
        })}
      />
    </MainTemplate>
  );
}

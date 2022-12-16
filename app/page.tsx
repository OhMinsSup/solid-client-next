import React from 'react';
import MainTemplate from '@components/main/MainTemplate';

import { getPostsListApi, getTopPostsApi } from '@api/post';
import { getTagsApi } from '@api/tags';

// types
import { Serialize } from '@libs/serialize/serialize';

import type {
  ListRespSchema,
  GetTopPostsRespSchema,
  TagWithPostCountSchema,
  UserRespSchema,
} from '@api/schema/resp';
import MainContents from '@components/main/MainContents';

export default async function Page(props: {
  params?: any;
  searchParams?: any;
}) {
  const respTags = await getTagsApi({ limit: 5 });

  const respTrending = await getTopPostsApi({
    duration: 7,
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
        Serialize.default<GetTopPostsRespSchema>({
          data: respTrending,
        })?.posts ?? []
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

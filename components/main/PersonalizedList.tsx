'use client';
import { getPostsListApi } from '@api/post';
import { PostListRespSchema } from '@api/schema/resp';
import PostItem from '@components/shared/PostItem';
import { QUERIES_KEY } from '@constants/constants';
import React, { useCallback, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useInfiniteQuery } from '@tanstack/react-query';

interface PersonalizedListProps {
  postList?: PostListRespSchema | undefined;
}

function PersonalizedList({ postList }: PersonalizedListProps) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    QUERIES_KEY.POSTS.ROOT({
      type: 'personalized',
    }),
    async ({ pageParam = 0 }) => {
      const { result } = await getPostsListApi({
        cursor: pageParam,
        limit: 25,
      });
      return result.result;
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor ?? undefined,
      initialData: postList as unknown as any,
    },
  );

  const list = useMemo(() => {
    return data?.pages?.flatMap((item) => item.list) ?? [];
  }, [data]);

  const loadMore = useCallback(
    async (index: number) => {
      if (index <= 0) return;
      if (hasNextPage) fetchNextPage();
    },
    [fetchNextPage, hasNextPage],
  );

  return (
    <Virtuoso
      useWindowScroll
      style={{ height: '100%' }}
      data={list}
      endReached={loadMore}
      components={{
        Footer: (props) => null,
      }}
      overscan={5}
      itemContent={(_, data) => {
        return <PostItem post={data} />;
      }}
    />
  );
}

export default PersonalizedList;

import React, { useMemo } from 'react';

// components
import TrendingPostItem from './TrendingPostItem';

// utils
import { isNull, isUndefined } from '@utils/assertion';

// hooks
import { useTopPostQuery } from '@api/post/hook/useTopPostQuery';

interface TrendingPostListProps {
  enabled: boolean;
  duration: string;
  initialData?: any;
}

function TrendingPostList({
  duration,
  initialData,
  enabled,
}: TrendingPostListProps) {
  const { data } = useTopPostQuery(
    {
      duration: Number(duration),
    },
    {
      enabled,
      initialData,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  );

  const posts = useMemo(() => {
    return data?.result?.result?.posts ?? [];
  }, [data]);

  if (isNull(posts) || isUndefined(posts)) return null;

  return (
    <>
      {posts?.map((item) => (
        <TrendingPostItem
          key={`trending-simple-post-${duration}-item-${item.id}`}
          data={item}
        />
      ))}
    </>
  );
}

export default TrendingPostList;

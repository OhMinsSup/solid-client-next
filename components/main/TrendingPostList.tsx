import React from 'react';
import TrendingPostItem from './TrendingPostItem';

import { isNull, isUndefined } from '@utils/assertion';
import type { PostDetailRespSchema } from '@api/schema/resp';

interface TrendingPostListProps {
  type: '1W' | '1M' | '3M' | '6M';
  postList?: PostDetailRespSchema[];
}

function TrendingPostList({ type, postList }: TrendingPostListProps) {
  if (isNull(postList) || isUndefined(postList)) return null;

  return (
    <>
      {postList?.map((item) => (
        <TrendingPostItem
          key={`trending-simple-post-${type}-item-${item.id}`}
          data={item}
        />
      ))}
    </>
  );
}

export default TrendingPostList;

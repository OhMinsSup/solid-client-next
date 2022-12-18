'use client';
import React, { useMemo, useRef } from 'react';

// hooks
import { useEventListener } from '@hooks/useEventListener';
import { useInfiniteQuery } from '@tanstack/react-query';

// api
import { getFileListApi } from '@api/files';

// constants
import { QUERIES_KEY } from '@constants/constants';

// utils
import { optimizeAnimation } from '@utils/util';
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from '@libs/browser-utils/dom';

// components
import ImageGridCard from './ImageGridCard';

interface ImageGridProps {}

const ImageGrid: React.FC<ImageGridProps> = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    QUERIES_KEY.FILE.ROOT,
    async ({ pageParam = 0 }) => {
      const { result } = await getFileListApi({
        cursor: pageParam,
      });
      return result.result;
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor ?? undefined,
    },
  );

  const list = useMemo(() => {
    return data?.pages?.flatMap?.((page) => page.list) ?? [];
  }, [data]);

  const scrollMethod = optimizeAnimation(() => {
    const el = getTargetElement(ref);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 200 && hasNextPage) {
      fetchNextPage();
    }
  });

  useEventListener('scroll', scrollMethod, { target: ref });

  return (
    <div className="h-80 overflow-y-scroll" ref={ref}>
      <div className="grid grid-cols-8 gap-4 md:grid-cols-9">
        {list.map((item) => (
          <ImageGridCard key={`photo-item-${item.id}`} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;

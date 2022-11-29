'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';

// components
import RightContentBox from './RightContentBox';
import TrendingPostList from './TrendingPostList';
import { Tab } from '@headlessui/react';

// hooks
import { usePathname } from 'next/navigation';

// types
import type { PostDetailRespSchema } from '@api/schema/resp';

interface TrendingPostBoxProps {
  postList: PostDetailRespSchema[];
}

function TrendingPostBox({ postList }: TrendingPostBoxProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const KEY_MAP_RECORD: Record<number, '1W' | '1M' | '3M' | '6M'> =
    useMemo(() => {
      return {
        0: '1W',
        1: '1M',
        2: '3M',
        3: '6M',
      };
    }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChangeTab = useCallback(
    (index: number) => {
      router.replace('/?dateType=' + KEY_MAP_RECORD[index]);
    },
    [KEY_MAP_RECORD, router],
  );

  useEffect(() => {
    const dateType = searchParams.get('dateType') as '1W' | '1M' | '3M' | '6M';
    if (!dateType) return;
    const index = Object.values(KEY_MAP_RECORD).indexOf(dateType);
    setSelectedIndex(index);
  }, [searchParams]);

  return (
    <RightContentBox title="Trending" to="/">
      <Tab.Group selectedIndex={selectedIndex} onChange={onChangeTab}>
        <Tab.List className="tab-list-base">
          <Tab
            value="1W"
            className={({ selected }) =>
              classNames('tab-base', {
                active: selected,
              })
            }
          >
            1 week
          </Tab>
          <Tab
            value="1M"
            className={({ selected }) =>
              classNames('tab-base', {
                active: selected,
              })
            }
          >
            1 months
          </Tab>
          <Tab
            value="3M"
            className={({ selected }) =>
              classNames('tab-base', {
                active: selected,
              })
            }
          >
            3 months
          </Tab>
          <Tab
            value="6M"
            className={({ selected }) =>
              classNames('tab-base', {
                active: selected,
              })
            }
          >
            6 months
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingPostList type="1W" postList={postList} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingPostList type="1M" postList={postList} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingPostList type="3M" postList={postList} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingPostList type="6M" postList={postList} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </RightContentBox>
  );
}

export default TrendingPostBox;

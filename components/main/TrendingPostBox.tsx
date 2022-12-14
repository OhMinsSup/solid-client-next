'use client';
import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

// components
import RightContentBox from './RightContentBox';
import TrendingPostList from './TrendingPostList';
import { Tab } from '@headlessui/react';

// types
import type { PostDetailRespSchema } from '@api/schema/resp';

interface TrendingPostBoxProps {
  postList: PostDetailRespSchema[];
}

function TrendingPostBox({ postList }: TrendingPostBoxProps) {
  const KEY_MAP_RECORD: Record<number, string> = useMemo(() => {
    return {
      0: '7',
      1: '30',
      2: '90',
      3: '180',
    };
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChangeTab = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <RightContentBox title="Trending" to="/">
      <Tab.Group selectedIndex={selectedIndex} onChange={onChangeTab}>
        <Tab.List className="tab-list-base">
          <Tab
            value="7"
            className={({ selected }) =>
              classNames('tab-base', {
                active: selected,
              })
            }
          >
            1 week
          </Tab>
          <Tab
            value="30"
            className={({ selected }) =>
              classNames('tab-base', {
                active: selected,
              })
            }
          >
            1 months
          </Tab>
          <Tab
            value="90"
            className={({ selected }) =>
              classNames('tab-base', {
                active: selected,
              })
            }
          >
            3 months
          </Tab>
          <Tab
            value="180"
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
            <TrendingPostList
              duration={KEY_MAP_RECORD[0]}
              enabled={selectedIndex === 0}
              initialData={postList}
            />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingPostList
              duration={KEY_MAP_RECORD[1]}
              enabled={selectedIndex === 1}
            />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingPostList
              duration={KEY_MAP_RECORD[2]}
              enabled={selectedIndex === 2}
            />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingPostList
              duration={KEY_MAP_RECORD[3]}
              enabled={selectedIndex === 3}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </RightContentBox>
  );
}

export default TrendingPostBox;

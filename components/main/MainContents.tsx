'use client';
import React from 'react';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import {
  FeaturedOutline,
  PersonalizedIcon,
  RecentIcon,
} from '@components/ui/Icon';
import PersonalizedList from './PersonalizedList';
import FeaturedList from './FeaturedList';
import RecentList from './RecentList';

// types
import type { PostListRespSchema } from '@api/schema/resp';

interface MainContentsProps {
  postList?: PostListRespSchema | undefined;
}

function MainContents({ postList }: MainContentsProps) {
  return (
    <div className="relative col-span-7 min-w-0 pt-5 pb-24">
      <div className="overflow-hidden rounded-lg border bg-white">
        <Tab.Group>
          <div className="main-tab-container">
            <Tab.List className="flex flex-row items-center overflow-auto">
              <Tab
                className={({ selected }) =>
                  classNames('main-tab-base', {
                    active: selected,
                  })
                }
              >
                <PersonalizedIcon className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Personalized</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames('main-tab-base', {
                    active: selected,
                  })
                }
              >
                <FeaturedOutline className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Featured</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames('main-tab-base', {
                    active: selected,
                  })
                }
              >
                <RecentIcon className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Recent</span>
              </Tab>
            </Tab.List>
            <div className="flex flex-row items-center"></div>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <PersonalizedList postList={postList} />
            </Tab.Panel>
            <Tab.Panel>
              <FeaturedList postList={postList} />
            </Tab.Panel>
            <Tab.Panel>
              <RecentList postList={postList} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default MainContents;

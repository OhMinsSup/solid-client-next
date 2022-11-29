import React from 'react';
import Header from '@components/ui/Shared/Header';
import LeftSidebar from './LeftSidebar';
import TrendingTags from './TrendingTags';
import RightSidebar from './RightSidebar';
import TrendingPostBox from './TrendingPostBox';

// types
import type {
  PostDetailRespSchema,
  TagWithPostCountSchema,
} from '@api/schema/resp';

interface MainTemplateProps {
  tags: TagWithPostCountSchema[];
  postList: PostDetailRespSchema[];
}

function MainTemplate(props: React.PropsWithChildren<MainTemplateProps>) {
  return (
    <div className="min-h-screen bg-gray-50 text-zinc-800">
      <Header />
      <main className="main">
        <LeftSidebar>
          <TrendingTags tags={props.tags} />
        </LeftSidebar>
        {props.children}
        <RightSidebar>
          <TrendingPostBox postList={props.postList} />
        </RightSidebar>
      </main>
    </div>
  );
}

export default MainTemplate;

'use client';
import React from 'react';
import { useMedia } from 'react-use';
import OtherBox from './OtherBox';

interface RightSidebarProps {}

function RightSidebar(props: React.PropsWithChildren<RightSidebarProps>) {
  const isLarge = useMedia('(min-width: 1024px)', false);

  if (!isLarge) return null;

  return (
    <aside className="col-span-3">
      <div className="py-5 lg:block">
        {props.children}
        <OtherBox />
      </div>
    </aside>
  );
}

export default RightSidebar;

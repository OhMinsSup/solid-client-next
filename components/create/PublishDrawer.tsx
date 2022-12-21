'use client';
import React from 'react';

// hooks
import { useWriteStore } from '@store/useWriteStore';
import { useMedia } from 'react-use';

import Drawer from 'rc-drawer';
import TagCombobox from './TagCombobox';
import Description from './Description';
import DisabledComment from './DisabledComment';
import IsPublic from './IsPublic';
import Schedule from './Schedule';
import { XIcon } from '@components/ui/Icon';

interface PublishDrawerProps {
  onPublich: () => void;
}

const PublishDrawer: React.FC<PublishDrawerProps> = ({ onPublich }) => {
  const { visible, closeSetting } = useWriteStore();

  const is768px = useMedia('(min-width: 768px)', false);

  return (
    <Drawer
      open={visible.setting}
      placement={is768px ? 'right' : 'bottom'}
      width={is768px ? '40%' : '100%'}
      destroyOnClose
      onClose={closeSetting}
    >
      <div className="px-4 pt-4 pb-10 md:px-6">
        <div className="relative">
          <div className="flex flex-row items-center justify-between border-b pb-4">
            <button
              className="mr-2 flex flex-row items-center justify-center rounded-full border border-transparent py-1 px-3 text-center text-base font-medium text-gray-700 outline-none"
              onClick={closeSetting}
            >
              <XIcon className="mr-2 h-5 w-5 fill-current" />
              <span>Close</span>
            </button>
            <button
              onClick={onPublich}
              className="ml-2 flex flex-row items-center justify-center rounded-full border border-blue-500 bg-blue-500 py-1 px-3 text-center text-lg font-semibold text-white outline-none hover:shadow-md"
            >
              Publish
            </button>
          </div>
        </div>
        <TagCombobox />
        <Description />
        <DisabledComment />
        <IsPublic />
        <Schedule />
      </div>
    </Drawer>
  );
};

export default PublishDrawer;

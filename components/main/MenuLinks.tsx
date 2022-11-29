import React from 'react';
import SidebarNavLink from './SidebarNavLink';
import {
  BookmarkIcon,
  ExploreIcon,
  FeedIcon,
  TempIcon,
} from 'components/ui/Icon';

const MenuLinks = () => {
  return (
    <>
      <SidebarNavLink
        text="My Feed"
        to="/"
        icon={<FeedIcon className="icon-base" />}
      />
      <SidebarNavLink
        text="Explore"
        to="/explore"
        icon={<ExploreIcon className="icon-base" />}
      />
      <SidebarNavLink
        text="Drafts"
        to="/drafts"
        icon={<TempIcon className="icon-base" />}
      />
      <SidebarNavLink
        text="Bookmarks"
        to="/bookmarks"
        icon={<BookmarkIcon className="icon-base" />}
      />
    </>
  );
};

export default MenuLinks;

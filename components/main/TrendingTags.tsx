import React from 'react';
import TagItem from './TagItem';

interface TrendingTagsProps {}

export default async function TrendingTags() {
  return (
    <div className="flex flex-col items-start">
      {/* tag list */}
      {/* {trendingTag?.result?.list.map((tag) => (
        <TagItem
          key={tag.id}
          id={tag.id}
          name={tag.name}
          count={tag.postsCount}
        />
      ))} */}
    </div>
  );
}

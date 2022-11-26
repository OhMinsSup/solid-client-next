import React from 'react';
import TagItem from './TagItem';

import type { TagWithPostCountSchema } from '@api/schema/resp';

interface TrendingTagsProps {
  tags: TagWithPostCountSchema[];
}

export default function TrendingTags(props: TrendingTagsProps) {
  const { tags } = props;
  return (
    <div className="flex flex-col items-start">
      {tags.map((tag) => (
        <TagItem
          key={tag.id}
          id={tag.id}
          name={tag.name}
          count={tag.postsCount}
        />
      ))}
    </div>
  );
}

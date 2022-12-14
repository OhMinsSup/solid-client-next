import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { CommentIcon, LikeIcon } from '../ui/Icon';

import { ASSET_URL, PAGE_ENDPOINTS } from '@constants/constants';

import type { PostDetailRespSchema } from '@api/schema/resp';
import Image from 'next/image';
import classNames from 'classnames';

interface TrendingPostItemProps {
  data: PostDetailRespSchema;
}

const TrendingPostItem: React.FC<TrendingPostItemProps> = ({ data }) => {
  const { user, id, title, subTitle, count } = data;

  const [isLoading, setLoading] = useState(true);

  const avatarUrl = useMemo(() => {
    return user?.profile?.avatarUrl ?? ASSET_URL.DEFAULT_AVATAR;
  }, [user]);

  return (
    <div className="flex flex-row items-start py-2">
      {/* Thubmnail */}
      <div className="mr-3">
        <Link
          href={PAGE_ENDPOINTS.ITEMS.ID(id)}
          className="block h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border"
        >
          <div className="h-full w-full">
            <div className="relative h-full w-full rounded-full bg-gray-100">
              <Image
                src={avatarUrl}
                width={38}
                height={38}
                className={classNames(
                  'duration-700 ease-in-out group-hover:opacity-75',
                  isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0',
                )}
                onLoadingComplete={() => setLoading(false)}
                alt="thumbnail"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3
          className="mb-1 font-bold text-gray-900"
          style={{ lineHeight: '1.375' }}
        >
          <Link href={PAGE_ENDPOINTS.ITEMS.ID(id)}>{title}</Link>
        </h3>
        <p className="mb-2 text-gray-500">
          <Link href={PAGE_ENDPOINTS.ITEMS.ID(id)}>{subTitle}</Link>
        </p>
        <div className="flex flex-row flex-wrap items-center">
          {/* Like */}
          <Link
            href="/"
            className="mr-4 flex flex-row items-center text-base font-medium text-gray-500"
          >
            <LikeIcon className="mr-2 h-5 w-5 flex-shrink fill-current" />
            <span>{count?.postLike}</span>
          </Link>
          {/* Comment */}
          <Link
            href="/"
            className="mr-4 flex flex-row items-center text-base font-medium text-gray-500"
          >
            <CommentIcon className="mr-2 h-5 w-5 flex-shrink fill-current" />
            <span>6</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingPostItem;

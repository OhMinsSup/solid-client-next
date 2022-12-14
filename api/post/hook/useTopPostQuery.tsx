import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { getTopPostsApi } from '@api/post/post';

// constants
import { QUERIES_KEY } from '@constants/constants';

// types
import type { AppAPI } from '@api/schema/api';
import type { GetTopPostsRespSchema } from '@api/schema/resp';

type QueryKey = [string, { duration: number }];

interface ReturnValue {
  result: AppAPI<GetTopPostsRespSchema>;
}

interface Params {
  duration: number;
}

interface Options
  extends Omit<
    UseQueryOptions<ReturnValue, any, ReturnValue, QueryKey>,
    'queryKey' | 'queryFn'
  > {}

export function useTopPostQuery(params?: Partial<Params>, options?: Options) {
  const { duration = undefined } = params || {};

  const opts: Options = {
    ...options,
    // 1시간
    staleTime: 1000 * 60 * 60,
    // 24시간
    cacheTime: 1000 * 60 * 60 * 24,
  };

  const resp = useQuery(
    QUERIES_KEY.POSTS.TOP_POSTS(duration) as QueryKey,
    (_key) => {
      const queryKey = _key.queryKey;
      const [_, { duration }] = queryKey;
      return getTopPostsApi({
        duration,
      });
    },
    opts,
  );

  return resp;
}

import { fetchClient, type RequestConfig } from '@api/client';
import { API_ENDPOINTS } from '@constants/constants';

import type { AppAPI } from '@api/schema/api';
import type { SimpleTrendingPostsRespSchema } from '@api/schema/resp';
import type { SimpleTrendingPostsQuery } from '@api/schema/query';

export async function getSimpleTrendingPostsApi(
  query: SimpleTrendingPostsQuery,
  config?: RequestConfig,
) {
  const url = `${API_ENDPOINTS.POSTS.TRENDING}?dataType=${query.dateType}`;
  const response = await fetchClient.get<AppAPI<SimpleTrendingPostsRespSchema>>(
    url,
    config,
  );
  return { result: response.data };
}

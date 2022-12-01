import { fetchClient, type RequestConfig } from '@api/client';
import { API_ENDPOINTS } from '@constants/constants';
import { isEmpty } from '@utils/assertion';

import type { AppAPI } from '@api/schema/api';
import type {
  PostListRespSchema,
  SimpleTrendingPostsRespSchema,
} from '@api/schema/resp';
import type {
  PostListQuery,
  SimpleTrendingPostsQuery,
} from '@api/schema/query';

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

export async function getPostsListApi(
  query?: PostListQuery,
  config?: RequestConfig,
) {
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set('limit', query.limit.toString());
  }
  if (query?.cursor) {
    search.set('cursor', query.cursor.toString());
  }
  if (query?.keyword) {
    search.set('keyword', query.keyword);
  }

  if (query?.type) {
    search.set('type', query.type);
  }

  if (query?.startDate && query?.endDate) {
    search.set('startDate', query.startDate);
    search.set('endDate', query.endDate);
  }

  let url = API_ENDPOINTS.POSTS.ROOT;
  if (!isEmpty(search.toString())) {
    url += `?${search.toString()}`;
  }
  const response = await fetchClient.get<AppAPI<PostListRespSchema>>(
    url,
    config,
  );
  return { result: response.data };
}

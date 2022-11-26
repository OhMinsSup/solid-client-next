import { fetchClient, type RequestConfig } from '@api/client';
import { API_ENDPOINTS } from '@constants/constants';
import { isEmpty } from '@utils/assertion';

import type { AppAPI } from '@api/schema/api';
import type { TagListRespSchema } from '@api/schema/resp';
import type { TagListQuery } from '@api/schema/query';

export async function getTagsApi(query?: TagListQuery, config?: RequestConfig) {
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set('limit', query.limit.toString());
  }
  if (query?.cursor) {
    search.set('cursor', query.cursor.toString());
  }
  if (query?.name) {
    search.set('name', query.name);
  }

  if (query?.type) {
    search.set('type', query.type);
  }

  let url = API_ENDPOINTS.TAGS.ROOT;
  if (!isEmpty(search.toString())) {
    url += `?${search.toString()}`;
  }

  const response = await fetchClient.get<AppAPI<TagListRespSchema>>(
    url,
    config,
  );
  return { result: response.data };
}

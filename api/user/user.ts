import { fetchClient, type RequestConfig } from '@api/client';
import { API_ENDPOINTS } from '@constants/constants';

import type { AppAPI } from '@api/schema/api';
import type { UserRespSchema } from '@api/schema/resp';

export async function getUserInfoApi(config?: RequestConfig) {
  const response = await fetchClient.get<AppAPI<UserRespSchema>>(
    API_ENDPOINTS.USERS.ME,
    config,
  );
  return { result: response.data };
}

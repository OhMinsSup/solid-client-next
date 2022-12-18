import { fetchClient, type RequestConfig } from '@api/client';

// utils
import { isEmpty } from '@utils/assertion';

// constants
import { API_ENDPOINTS } from '@constants/constants';

// types
import type { AppAPI } from '../schema/api';
import type { UploadBody } from '../schema/body';
import type { FileListRespSchema, UploadRespSchema } from '../schema/resp';
import type { PaginationQuery } from '../schema/query';

export async function imageUploadApi(body: UploadBody, config?: RequestConfig) {
  const formData = new FormData();
  formData.append('file', body.file);
  formData.append('uploadType', body.uploadType);
  formData.append('mediaType', body.mediaType);
  formData.append('filename', body.file.name);

  const response = await fetchClient.post<AppAPI<UploadRespSchema>>(
    API_ENDPOINTS.FILES.UPLOAD,
    formData,
    config,
  );

  return { result: response.data };
}

export async function getFileListApi(
  query?: PaginationQuery,
  config?: RequestConfig,
) {
  const search = new URLSearchParams();

  if (query?.limit) {
    search.set('limit', query.limit.toString());
  }
  if (query?.cursor) {
    search.set('cursor', query.cursor.toString());
  }

  let url = API_ENDPOINTS.FILES.ROOT;
  if (!isEmpty(search.toString())) {
    url += `?${search.toString()}`;
  }

  const response = await fetchClient.get<AppAPI<FileListRespSchema>>(
    url,
    config,
  );

  return { result: response.data };
}

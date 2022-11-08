import { fetchClient, type RequestConfig } from '@api/client';
import { API_ENDPOINTS } from '@constants/constants';

import type { AppAPI } from '@api/schema/api';
import type { SignupBody, SigninBody } from '@api/schema/body';
import type { AuthRespSchema } from '@api/schema/resp';

// 로그인
export async function signinApi(data: SigninBody, config?: RequestConfig) {
  const response = await fetchClient.post<AppAPI<AuthRespSchema>>(
    API_ENDPOINTS.AUTH.SIGNIN,
    data,
    config,
  );
  return { result: response.data };
}

// 회원가입
export async function signupApi(data: SignupBody, config?: RequestConfig) {
  const response = await fetchClient.post<AppAPI<AuthRespSchema>>(
    API_ENDPOINTS.AUTH.SIGNUP,
    data,
    config,
  );
  return { result: response.data };
}

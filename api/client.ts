import { config } from '@constants/env';
import QueryString from 'qs';

import type { ReadonlyRequestCookies } from 'next/dist/server/app-render';
import type { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

export interface RequestConfig {
  params?: any;
  headers?: HeadersInit;
  cache?: RequestCache;
  signal?: AbortSignal;
  next?: NextFetchRequestConfig;
}

export class FetchError extends Error {
  constructor(public response: Response, public data: any) {
    super(`Fetch failed with status ${response.status}`);
  }
}

async function rejectIfNeeded(response: Response) {
  if (!response.ok) {
    const data = await response.json();
    throw new FetchError(response, data);
  }
  return response;
}

let _cookie = '';

export function setClientCookie(cookie: string) {
  _cookie = cookie;
}

export function clearCookie() {
  _cookie = '';
}

export function consumeCookie(
  cookies: ReadonlyRequestCookies | RequestCookies,
) {
  let cookieString = '';
  const cookieList = cookies.getAll();
  cookieList.map((cookie) => {
    cookieString += `${cookie.name}=${cookie.value};`;
  });

  if (cookieString) {
    setClientCookie(cookieString);
  }
}

export async function withCookie<T>(
  fn: AsyncFn<T>,
  cookie: ReadonlyRequestCookies | RequestCookies,
  isAsync = false,
) {
  consumeCookie(cookie);
  const promise = fn();
  if (isAsync) {
    await promise;
  }
  clearCookie();
  return promise;
}

type AsyncFn<T> = () => Promise<T>;

export const fetchClient = {
  baseUrl: config.apiHost ?? 'http://localhost:8080/api/v1',
  async get<T>(url: string, config: RequestConfig = {}) {
    const query = config?.params
      ? QueryString.stringify(config?.params, { addQueryPrefix: true })
      : '';
    const response = await fetch(this.baseUrl.concat(url, query), {
      method: 'GET',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        Cookie: _cookie,
        ...(config?.headers ?? {}),
      },
      ...(config?.cache ? { cache: config.cache } : {}),
      ...(config?.next ? { next: config.next } : {}),
    });
    await rejectIfNeeded(response);
    const data: T = await response.json();
    const { headers } = response;
    return {
      data,
      headers,
    };
  },
  async post<T>(url: string, body?: any, config: RequestConfig = {}) {
    const isFormData = body instanceof FormData;
    const response = await fetch(this.baseUrl.concat(url), {
      method: 'POST',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      ...(config?.cache ? { cache: config.cache } : {}),
      signal: config.signal,
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });
    await rejectIfNeeded(response);
    const data: T = await response.json();
    const { headers } = response;
    return {
      data,
      headers,
    };
  },
  async patch<T>(url: string, body: any, config: RequestConfig = {}) {
    const response = await fetch(this.baseUrl.concat(url), {
      method: 'PATCH',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      ...(config?.cache ? { cache: config.cache } : {}),
      signal: config.signal,
      body: JSON.stringify(body),
    });
    await rejectIfNeeded(response);

    const data: T = await response.json();
    const { headers } = response;
    return {
      data,
      headers,
    };
  },
  async delete<T = any>(url: string, config: RequestConfig = {}) {
    const query = config?.params
      ? QueryString.stringify(config?.params, { addQueryPrefix: true })
      : '';

    const response = await fetch(this.baseUrl.concat(url, query), {
      method: 'DELETE',
      ...(typeof window === 'undefined' ? {} : { credentials: 'include' }),
      headers: {
        Cookie: _cookie,
        ...(config.headers ?? {}),
      },
      ...(config?.cache ? { cache: config.cache } : {}),
      signal: config.signal,
    });

    await rejectIfNeeded(response);

    const data: T = response.headers.get('Content-Type')?.includes('json')
      ? await response.json()
      : ((await response.text()) as any);

    const { headers } = response;
    return {
      data,
      headers,
    };
  },
};

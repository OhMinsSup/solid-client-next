export const QUERIES_KEY = {
  AUTH: {
    SIGNUP: 'signupApi',
  },
  ME: ['getUserInfoApi'],
  FILE: {
    ROOT: ['getFileListApi'],
  },
  POSTS: {
    ROOT: (query?: any) => {
      let keys: any[] = ['getPostsListApi'];
      if (query) {
        keys = [...keys, query];
      }
      return keys;
    },
    TRENDING: (type: string) => ['getSimpleTrendingPostsApi', type],
  },
  TAGS: {
    ROOT: (keyword?: string, type?: string) => {
      let keys = ['getTagListApi'];

      if (keyword) {
        keys.push(keyword);
      }

      if (type) {
        keys.push(type);
      }

      return keys;
    },
  },
};

export const PAGE_ENDPOINTS = {
  ROOT: '/',
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
  },
  CREATE: {
    STORY: '/create/story',
  },
  ITEMS: {
    ID: (id: number | string) => `/items/${id}`,
  },
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
  },
  USERS: {
    ME: '/users',
  },
  POSTS: {
    ROOT: '/posts',
    TRENDING: '/posts/trending/simple',
  },
  FILES: {
    ROOT: '/files',
    UPLOAD_URL: '/files/upload_url',
    UPLOAD: '/files/upload',
  },
  TAGS: {
    ROOT: '/tags',
  },
} as const;
export const QUERIES_KEY = {
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
    TOP_POSTS: (duration?: number) => {
      let keys: any[] = ['getTopPostsApi'];
      if (duration) {
        keys = keys.concat({ duration });
      }
      return keys;
    },
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

export const MUTATION_KEY = {
  AUTH: {
    SIGNUP: 'signupApi',
    SIGNIN: 'signinApi',
  },
};

export const ASSET_URL = {
  DEFAULT_AVATAR: '/static/images/qDAyv6PK_.png',
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
    GET_TOP_POSTS: '/posts/get-top-posts',
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

export interface PaginationQuery {
  limit?: number;
  cursor?: number;
}

export interface TagListQuery extends PaginationQuery {
  name?: string;
  type?: 'popular' | 'recent';
}

export interface PostListQuery extends PaginationQuery {
  keyword?: string;
  type?: 'popular' | 'recent' | 'past' | 'search';
  startDate?: string;
  endDate?: string;
}

export interface GetTopPostsQuery {
  duration: number;
}

export interface GetPostResponse {
  content: PostContent[];
  empty: boolean;
  first?: boolean;
  last: boolean;
  number: number;
  numberOfElements?: number;
  pageable?: PostPageable;
  size?: number;
  sort?: PostSort;
  totalElements?: number;
  totalPages?: number;
}

export interface PostContent {
  createdAt: string;
  title: string;
  id: number;
}

export interface PostPageable {
  offset: number
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: PostSort;
  unpaged: boolean;
}

export interface PostSort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface GetPostContentParam {
  id: string | undefined;
}

export interface GetPostContentResponse {
  content: string,
  createdAt: string,
  id: 0,
  postImages: [
    {
      imageUrl: string,
      originalName: string
    },
  ],
  title: string
}

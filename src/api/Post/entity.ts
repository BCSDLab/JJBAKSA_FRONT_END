export interface GetPostResponse {
  content: PostContent[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PostPageable;
  size: number;
  sort: PostSort;
  totalElements: number;
  totalPages: number;
}

export interface PostContent {
  boardType: string;
  content: string;
  createdAt: string;
  title: string;
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

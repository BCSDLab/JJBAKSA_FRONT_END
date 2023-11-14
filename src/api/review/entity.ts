export interface ReviewParams {
  placeId: string;
  content: string;
  rate: number;
  reviewImages: File[];
}

export interface ShopReviewsResponse {
  content: {
    content: string;
    createdAt: string;
    id: number;
    rate: number;
    reviewImages: {
      imageUrl: string;
      originalName: string;
    }[];
    shopPlaceId: string;
    userReviewResponse: {
      account: string;
      id: number;
      nickname: string;
      profileImage: {
        id: number;
        originalName: string;
        path: string;
        url: string;
      };
    };
  }[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

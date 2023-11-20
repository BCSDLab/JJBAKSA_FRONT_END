export interface GetMyScrapShopResponse {
  content: {
    address: string;
    category: string;
    createdAt: string;
    directory: {
      createdAt: string;
      id: number;
      name: string;
      scrapCount: number;
      updatedAt: string;
    };
    name: string;
    photo: string;
    placeId: string;
    ratingCount: number;
    scrapId: number;
    totalRating: number;
    updatedAt: string;
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

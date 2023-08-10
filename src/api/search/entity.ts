export interface FetchTrendingsResponse {
  trendings: string[]
}

export interface SearchQueryParams {
  searchText : string;
}

export interface ShopsParams {
  keyword: string;
  location: Coords;
}

export interface FetchShopsResponse {
  shopQueryResponseList: Shop[];
}

export interface Shop {
  placeId: string;
  name: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  openNow: boolean
  totalRating: number | null;
  ratingCount: number | null;
  photoToken: string;
  dist: number;
  category: string; // 추후 카테고리 확인 필요
}

export interface Coords {
  latitude: number,
  longitude: number
}

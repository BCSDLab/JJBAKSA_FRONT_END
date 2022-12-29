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
  content: Shop[];
}

interface Shop {
  address: string,
  dist: 0,
  placeId: string,
  placeName: string,
  score: number,
  shopId: number,
  x: string,
  y: string,
}

export interface Coords {
  latitude: number,
  longitude: number
}

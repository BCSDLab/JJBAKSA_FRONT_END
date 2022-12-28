export interface SearchQueryParams {
  searchQuery : string;
}

export interface ShopsParams {
  searchQuery: string;
  location: Coords;
}

export interface FetchTrendingsResponse {
  trendings: string[]
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

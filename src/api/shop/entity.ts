export interface FilterShopsParams {
  options_friend: 0 | 1;
  options_nearby: 0 | 1;
  options_scrap: 0 | 1;
  location?: Coords;
}

export interface FilterShopsResponse {
  geometry: {
    location: Coords;
  };
  name: string;
  photo: null | string[];
  placeId: string;
}

export type FilterShopsListResponse = FilterShopsResponse[];

export interface FetchTrendingsResponse {
  trendings: string[]
}

export interface SearchQueryParams {
  searchText : string;
}

export interface ShopsParams {
  keyword: string;
  location?: ShopsCoords;
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
  category: string;
}

export interface Coords {
  lat: number | undefined;
  lng: number | undefined;
}

export interface ShopsCoords {
  latitude: number,
  longitude: number
}

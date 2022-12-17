export interface SearchQueryParams {
  searchQuery : string;
}

export interface ShopsParams {
  searchQuery: string;
  location: Coords;
}

export interface Coords {
  latitude: number,
  longitude: number
}

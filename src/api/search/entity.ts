export interface FetchTrendingsResponse {
  trendings: string[]
}

export interface Coords {
  lng: number;
  lat: number;
}

export interface FetchAutoCompleteParams {
  query: string;
  location?: Coords;
}

export interface FetchAutoCompleteResponse {
  data: string[];
}

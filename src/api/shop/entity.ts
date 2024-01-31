export interface FilterShopsParams {
  options_friend: 0 | 1;
  options_nearby: 0 | 1;
  options_scrap: 0 | 1;
  location?: Coords;
}

export interface FilterShopsResponse {
  coordinate: Coords;
  name: string;
  photo: string;
  placeId: string;
}

export type FilterShopsListResponse = FilterShopsResponse[];

export interface FetchTrendingsResponse {
  trendings: string[];
}

export interface ShopsParams {
  keyword: string;
  location?: Coords;
}
export interface Coords {
  lat: number | undefined;
  lng: number | undefined;
}

export interface ShopQueryResponses {
  pageToken: string;
  shopQueryResponseList: ShopQueryResponse[];
}

interface Time {
  hour: number;
  minute: number;
}

export interface TodayPeriod {
  closeTime: Time;
  openTime: Time;
}

export interface ShopQueryResponse {
  category: string;
  coordinate: Coords;
  dist: number;
  formattedAddress: string;
  name: string;
  openNow: boolean | null;
  photoToken: string | null;
  placeId: string;
  simpleFormattedAddress: string | null;
}

export type Period = {
  closeTime: { hour: number; minute: number };
  openTime: { hour: number; minute: number };
} | null;

export interface FetchShopResponse {
  category: string;
  coordinate: Coords;
  formattedAddress: string;
  formattedPhoneNumber: string;
  name: string;
  photos: string[] | null;
  placeId: string;
  todayPeriod: Period;
}

export interface ShopRateResponse {
  totalRating: number;
  ratingCount: number;
}

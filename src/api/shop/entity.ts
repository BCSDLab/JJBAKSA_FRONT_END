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

export interface FetchShopsResponse {
  shopQueryResponseList: Shop[];
}

export interface Shop {
  placeId: string;
  name: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  openNow: boolean | null;
  totalRating: number | null;
  ratingCount: number | null;
  photoToken: string | null;
  dist: number;
  category: string; // 추후 카테고리 확인 필요
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

export interface FilterShopsParams {
  options_friend: 0 | 1;
  options_nearby: 0 | 1;
  options_scrap: 0 | 1;
}

interface FilterShopsResponse extends Omit<ShopQueryResponse, 'photoToken'> {
  photos: string[] | null;
  rate: ShopRateResponse;
}

export type FilterShopsListResponse = FilterShopsResponse[];

export interface FetchTrendingsResponse {
  trendings: string[];
}

export interface ShopsParams {
  keyword: string;
  category: 'cafe' | 'restaurant';
  location?: Coords;
}
export interface Coords {
  lat: number | undefined;
  lng: number | undefined;
}

export interface ShopsQueryResponse {
  pageToken: string;
  shopQueryResponseList: ShopQueryResponse[];
}

type Enumerate<T, Arr extends number[] = []> = Arr['length'] extends T ? Arr[number] : Enumerate<T, [...Arr, Arr['length']]>;

interface Time {
  hour: Enumerate<24>;
  minute: Enumerate<60>;
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
  simpleFormattedAddress: string;
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

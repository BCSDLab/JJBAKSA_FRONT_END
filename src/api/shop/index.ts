import {
  Coords,
  FetchShopsResponse, FetchTrendingsResponse, FilterShopsParams, FilterShopsResponse, ShopsParams,
} from './entity';
import shopApi from './shopApiClient';

export const fetchTrendings = () => shopApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = (shopId: string) => shopApi.get(`/shop?place_id=${shopId}`);

export const fetchShops = (params: ShopsParams) => shopApi.post<FetchShopsResponse>(`/shops?keyword=${params.keyword}&x=${params.location?.latitude}&y=${params.location?.longitude}`);

export const getfilterShops = (params: FilterShopsParams, location: Coords) => shopApi.post<FilterShopsResponse>(`/shops/maps?options_friend=${params.options_friend}&options_nearby=${params.options_nearby}&options_scrap=${params.options_friend}`, {
  lat: location.latitude,
  lng: location.longitude,
});

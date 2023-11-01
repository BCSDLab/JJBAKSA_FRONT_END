import {
  Coords, FetchShopsResponse, FetchTrendingsResponse, FilterShopsParams,
  FilterShopsListResponse, ShopsParams, FetchShopResponse,
} from './entity';
import shopApi from './shopApiClient';

export const fetchTrendings = () => shopApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = (shopId: string) => shopApi.get<FetchShopResponse>(`/shops/${shopId}`);

export const fetchShops = (params: ShopsParams) => shopApi.post<FetchShopsResponse>(`/shops?keyword=${params.keyword}`, {
  lat: params.location?.lat,
  lng: params.location?.lng,
});

export const getfilterShops = (params: FilterShopsParams, location: Coords) => shopApi.post<FilterShopsListResponse>(`/shops/maps?options_friend=${params.options_friend}&options_nearby=${params.options_nearby}&options_scrap=${params.options_scrap}`, {
  lat: location.lat,
  lng: location.lng,
});

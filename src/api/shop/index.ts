import {
  Coords, FetchShopsResponse, FetchTrendingsResponse, FilterShopsParams,
  FilterShopsListResponse, ShopsParams, FetchShopResponse,
} from './entity';
import shopApi from './shopApiClient';

export const fetchTrendings = () => shopApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = async (placeId: string) => {
  const { data } = await shopApi.get<FetchShopResponse>(`/shops/${placeId}`);
  return data;
};

export const fetchShops = (params: ShopsParams) => shopApi.post<FetchShopsResponse>(`/shops?keyword=${params.keyword}`, {
  lat: params.location?.lat,
  lng: params.location?.lng,
});

export const getfilterShops = (params: FilterShopsParams, location: Coords) => shopApi.post<FilterShopsListResponse>(`/shops/maps?options_friend=${params.options_friend}&options_nearby=${params.options_nearby}&options_scrap=${params.options_scrap}`, {
  lat: location.lat,
  lng: location.lng,
});

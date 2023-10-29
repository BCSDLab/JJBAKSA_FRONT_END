import {
  Coords, FetchShopsResponse, FetchTrendingsResponse, FilterShopsParams,
  FilterShopsListResponse, ShopsParams,
} from './entity';
import shopApi from './shopApiClient';

export const fetchTrendings = () => shopApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = (shopId: string) => shopApi.get(`/shop?place_id=${shopId}`);

export const getfilterShops = (params: FilterShopsParams, location: Coords) => shopApi.post<FilterShopsListResponse>(`/shops/maps?options_friend=${params.options_friend}&options_nearby=${params.options_nearby}&options_scrap=${params.options_scrap}`, {
  lat: location.lat,
  lng: location.lng,
});

export const fetchShops = (params: ShopsParams) => {
  const { location, keyword } = params;
  const url = `/shops?keyword=${keyword}`;
  const requestBody = {
    lat: location?.latitude,
    lng: location?.longitude,
  };
  return shopApi.post<FetchShopsResponse>(url, requestBody);
};

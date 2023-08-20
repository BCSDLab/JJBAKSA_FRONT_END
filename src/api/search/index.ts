import {
  FetchShopsResponse, FetchTrendingsResponse, ShopsParams, ShopPinResponse,
} from './entity';
import searchApi from './searchApiClient';

export const fetchTrendings = () => searchApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = async (shopId: string) => {
  const { data } = await searchApi.get<ShopPinResponse>(`/shops/${shopId}`);
  return data;
};

export const fetchShops = (params: ShopsParams) => searchApi.post<FetchShopsResponse>(`/shops?keyword=${params.keyword}&x=${params.location?.latitude}&y=${params.location?.longitude}`);

export const fetchPinShop = async (shopId: string) => {
  const { data } = await searchApi.get<ShopPinResponse>(`/shops/pin/${shopId}`);
  return data;
};

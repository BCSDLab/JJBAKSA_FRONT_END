import {
  FetchShopsResponse,
  FetchTrendingsResponse,
  ShopsParams,
} from './entity';
import searchApi from './searchApiClient';

export const fetchTrendings = () => searchApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = (shopId: string) => searchApi.get(`/shop?place_id=${shopId}`);

export const fetchShops = (params: ShopsParams) => {
  const { keyword, location } = params;
  const url = `/shops?keyword=${keyword}`;
  const requestBody = {
    x: location?.latitude,
    y: location?.longitude,
  };

  return searchApi.post<FetchShopsResponse>(url, requestBody);
};

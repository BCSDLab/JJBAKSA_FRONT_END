import {
  FetchShopsResponse,
  FetchTrendingsResponse,
  ShopsParams,
  FetchAutoCompleteParams,
  FetchAutoCompleteResponse,
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

export const fetchAutoComplete = (params: FetchAutoCompleteParams) => {
  const { query, location } = params;
  const url = `/shops/auto-complete?query=${query}`;
  const requestBody = {
    x: location?.latitude,
    y: location?.longitude,
  };
  return searchApi.post<FetchAutoCompleteResponse>(url, requestBody);
};

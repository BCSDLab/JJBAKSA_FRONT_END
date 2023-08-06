import { FetchShopsResponse, FetchTrendingsResponse, ShopsParams } from './entity';
import searchApi from './searchApiClient';

export const fetchTrendings = () => searchApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = (shopId: string) => searchApi.get(`/shops/${shopId}`);

export const fetchShops = (params: ShopsParams) => searchApi.post<FetchShopsResponse>(`/shops?keyword=${params.keyword}&x=${params.location?.latitude}&y=${params.location?.longitude}`);

import { FetchShopsResponse, FetchTrendingsResponse, ShopsParams } from './entity';
import searchApi from './searchApiClient';

export const fetchTrendings = () => searchApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = (shopId: string) => searchApi.get(`/shop?place_id=${shopId}`);

export const fetchShops = (params: ShopsParams) => searchApi.post<FetchShopsResponse>(`/shops?keyword=${params.searchQuery}&x=${params.location?.latitude}&y=${params.location?.longitude}`);

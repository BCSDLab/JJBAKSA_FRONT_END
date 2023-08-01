import { FetchShopsResponse, FetchTrendingsResponse, ShopsParams } from './entity';
import shophApi from './shopApiClient';

export const fetchTrendings = () => shophApi.get<FetchTrendingsResponse>('/trending');

export const fetchShop = (shopId: string) => shophApi.get(`/shop?place_id=${shopId}`);

export const fetchShops = (params: ShopsParams) => shophApi.post<FetchShopsResponse>(`/shops?keyword=${params.keyword}&x=${params.location?.latitude}&y=${params.location?.longitude}`);

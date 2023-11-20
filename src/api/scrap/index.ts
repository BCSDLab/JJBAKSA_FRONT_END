import scrapApi from './scrapApiClient';
import type { GetMyScrapShopResponse } from './entity';

export const scrapShop = (shopId: string) =>
  scrapApi.post('/scraps', { directoryId: 0, placeId: shopId });

export const getMyScrapShop = () => scrapApi.get<GetMyScrapShopResponse>('/scraps');

export const deleteScrapShop = (scrapId: number) => scrapApi.delete(`/scraps/${scrapId}`);

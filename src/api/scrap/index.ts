import scrapApi from './scrapApiClient';
import type { GetMyScrapShopResponse } from './entity';

export const postScrapShop = (shopId: string) =>
  // post된 음식점이 들어가는 최상위 directoryId는 0입니다.
  scrapApi.post('/scraps', { directoryId: 0, placeId: shopId });

export const getMyScrapShop = () => scrapApi.get<GetMyScrapShopResponse>('/scraps');

export const deleteScrapShop = (scrapId: number) => scrapApi.delete(`/scraps/${scrapId}`);

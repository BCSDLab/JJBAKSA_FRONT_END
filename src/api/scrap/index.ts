import { PostScrapParams } from './entity';
import scrapApi from './scrapApiClient';

export const postScrap = async (params:PostScrapParams) => scrapApi.post('/scraps', params);

export const deleteScrap = async (placeId:string) => scrapApi.delete(`/scraps/${placeId}`);

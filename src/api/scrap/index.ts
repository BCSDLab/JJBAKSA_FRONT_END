import { PostScrapParams, GetScrapResponse, PostScrapResponse } from './entity';
import scrapApi from './scrapApiClient';

export const postScrap = async (params:PostScrapParams) => {
  const { data } = await scrapApi.post<PostScrapResponse>('/scraps', params);
  return data;
};

export const deleteScrap = async (scrapId:number) => scrapApi.delete(`/scraps/${scrapId}`);

export const getScrap = async () => {
  const { data } = await scrapApi.get<GetScrapResponse>('/scraps');
  return data;
};

import reviewApi from './reviewApiClient';
import { GetReviewResponse, LatestReviewResponse, FetchParams } from './entity';

export const postReview = async (params:FormData) => reviewApi.post('/', params);

export const getMyReview = async (params:FetchParams) => {
  const { data } = await reviewApi.get<GetReviewResponse>(`/shop/${params.placeId}?sort=${params.sort}`);
  return data;
};

export const getFollowersReview = async (params:FetchParams) => {
  const { data } = await reviewApi.get<GetReviewResponse>(`/followers/shop/${params.placeId}?sort=${params.sort}`);
  return data;
};

export const latestFollowerReview = async (placeId:string) => {
  const { data } = await reviewApi.get<LatestReviewResponse>(`/followers/last-date/shop/${placeId}`);
  return data;
};

export const latestMyReview = async (placeId:string) => {
  const { data } = await reviewApi.get<LatestReviewResponse>(`/last-date/shop/${placeId}`);
  return data;
};

import { ReviewedShopsResponse, ReviewsResPonse, ScrapResponse } from './entity';
import myPageApi from './mypageApiClient';

export const getReviewedShops = async () => myPageApi.get<ReviewedShopsResponse>('/review/shops');

export const getReviews = async (placeId:string) => myPageApi.get<ReviewsResPonse>(`/review/shop/${placeId}`);

export const getScraps = async () => myPageApi.get<ScrapResponse>('/scraps');

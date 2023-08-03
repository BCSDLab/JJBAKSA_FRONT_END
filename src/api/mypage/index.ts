import { ReviewedShopsResponse, ReviewsResPonse } from './entity';
import myPageApi from './mypageApiClient';

export const getReviewedShops = async () => myPageApi.get<ReviewedShopsResponse>('/shops');

export const getReviews = async (placeId:string) => myPageApi.get<ReviewsResPonse>(`/shop/${placeId}`);

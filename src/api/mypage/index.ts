import {
  PatchProfileImageResponse, ReviewedShopsResponse, ReviewsResPonse, ScrapResponse,
} from './entity';
import myPageApi from './mypageApiClient';

export const getReviewedShops = async () => myPageApi.get<ReviewedShopsResponse>('/review/shops');

export const getReviews = async (placeId:string) => myPageApi.get<ReviewsResPonse>(`/review/shop/${placeId}`);

export const getScraps = async () => myPageApi.get<ScrapResponse>('/scraps');

export const patchProfileImage = async (image:FormData | null) => myPageApi.patch<PatchProfileImageResponse>('/user/profile', image, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const patchDefaultImage = async () => myPageApi.patch<PatchProfileImageResponse>('/user/profile', {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

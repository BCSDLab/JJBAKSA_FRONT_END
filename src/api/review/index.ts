import reviewApi from './reviewApiClient';

import type { ReviewParams, ShopReviewsResponse } from './entity';

export const postReview = (params: ReviewParams) => {
  const formData = new FormData();
  formData.append('content', params.content);
  formData.append('placeId', params.placeId);
  formData.append('rate', String(params.rate));
  params.reviewImages.forEach((image) => {
    formData.append('reviewImages', image);
  });
  return reviewApi.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteReview = (reviewId: string) => reviewApi.delete(`/${reviewId}`);

export const fetchFollowerReview = (placeId: string) => reviewApi.get<ShopReviewsResponse>(`/followers/shop/${placeId}`);

export const fetchMyReview = (placeId: string) => reviewApi.get<ShopReviewsResponse>(`/shop/${placeId}`);

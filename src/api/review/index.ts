import reviewApi from './reviewApiClient';

import type {
  FollowerLatestDateResponse, MyLatestDateResponse,
  ReviewListParams, ReviewParams, ShopReviewsResponse,
} from './entity';

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

export const fetchFollowerReview = (params: ReviewListParams) => reviewApi.get<ShopReviewsResponse>(`/followers/shop/${params.placeId}?sort=${params.sort}`);

export const fetchFollowerLatestDate = (placeId: string) => reviewApi.get<FollowerLatestDateResponse>(`/followers/last-date/shop/${placeId}`);

export const fetchMyReview = (params: ReviewListParams) => reviewApi.get<ShopReviewsResponse>(`/shop/${params.placeId}?sort=${params.sort}`);

export const fetchMyLatestDate = (placeId: string) => reviewApi.get<MyLatestDateResponse>(`/last-date/shop/${placeId}`);

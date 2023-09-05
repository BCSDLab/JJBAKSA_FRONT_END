import reviewApi from './reviewApiClient';
import {
  GetReviewResponse, LatestReviewResponse, FetchParams, ReviewParams,
} from './entity';

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

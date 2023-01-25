import { ReviewInfo } from './entity';
import reviewApi from './reviewApiClient';

export const getReview = () => reviewApi.get<ReviewInfo>('/review');

export const postReview = async (reviewInfo: ReviewInfo) => {
  await reviewApi.post<ReviewInfo>('/review', reviewInfo, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

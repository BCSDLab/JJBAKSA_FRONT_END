import reviewApi from './reviewApiClient';
// import { PostReviewParams } from './entity';

export const postReview = async (params:FormData) => reviewApi.post('/', params);

export const myReview = async (placeId:string) => reviewApi.get(`/shop/${placeId}`);

export const followersReview = async (placeId:string) => reviewApi.get(`/followers/shop/${placeId}`);

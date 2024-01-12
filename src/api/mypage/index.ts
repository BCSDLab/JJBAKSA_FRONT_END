import followApi from 'api/follow/followApiClient';

import {
  FollowersResponse,
  PatchNicknameResponse,
  PatchProfileImageResponse, ReviewedShopsResponse, ReviewsResponse, ScrapResponse,
} from './entity';
import myPageApi from './mypageApiClient';

export const getReviewedShops = async () => myPageApi.get<ReviewedShopsResponse>('/review/shops?size=10');

export const getReviews = async (placeId:string) => myPageApi.get<ReviewsResponse>(`/review/shop/${placeId}?size=10`);

export const getScraps = async (pageParam:number) => myPageApi.get<ScrapResponse>(`/scraps?cursor=${pageParam}`);

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

export const patchNickname = async (nickname:string) => myPageApi.patch<PatchNicknameResponse>('/user/me', { nickname });

export const getFollowers = async () => followApi.get<FollowersResponse>('/follow/followers');

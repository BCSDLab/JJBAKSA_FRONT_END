import {
  AcceptFollowParams,
  CancleFollowParams,
  DeleteFollowerParams,
  GetDetailReviewResponse,
  GetFollowerReviewCountParam,
  GetFollowListResponse,
  GetFollowReviewResponse,
  PostFollowerParams,
  RejectFollowParams,
  SearchUsersResponse,
  SentOrReceivedFollowResponse,
} from './entity';
import followApi from './followApiClient';

export const followList = (pageParam: string) => followApi.get<GetFollowListResponse>(`/follow/followers?pageSize=10&${pageParam}`);

export const checkReceivedFollow = (pageParam: number) => followApi.get<SentOrReceivedFollowResponse>(`/follow/requests/receive?page=${pageParam}&pageSize=20`);

export const checkSentFollow = (pageParam: number) => followApi.get<SentOrReceivedFollowResponse>(`/follow/requests/send?page=${pageParam}&pageSize=10`);

export const requestFollow = (param: PostFollowerParams) => followApi.post('/follow/requests', {
  userAccount: param.userAccount,
});

export const acceptFollow = (param: AcceptFollowParams) => followApi.post(`/follow/requests/${param.id}/accept`);

export const searchUsers = (keyword: string, pageParam: string) => followApi.get<SearchUsersResponse>(`/users?keyword=${keyword}&${pageParam}&pageSize=10`);

export const cancelFollow = (param: CancleFollowParams) => followApi.delete(`/follow/requests/${param.id}/cancel`);

export const rejectFollow = (param: RejectFollowParams) => followApi.delete(`/follow/requests/${param.id}/reject`);

export const deleteFollow = (param: DeleteFollowerParams) => followApi.delete('/follow/followers', {
  data: { userAccount: param.userAccount },
});

export const recentlyActiveFollow = () => followApi.get<GetFollowListResponse>('/recently-active-followers?pageSize=15');

export const getFollowReview = (id: number, pageParam: string) => followApi.get<GetFollowReviewResponse>(`/review/follower/${id}/shops?size=10&${pageParam}`);

export const getDetailReview = (followId: number, placeId: string) => followApi.get<GetDetailReviewResponse>(`/review/follower/${followId}/shop/${placeId}?size=5`);

export const getFollowerReviewCount = (param: GetFollowerReviewCountParam) => followApi.get(`/review/follower/${param.id}/count`);

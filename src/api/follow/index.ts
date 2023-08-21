import {
  // FollowListParams,
  PostFollowerParams,
  // SearchUsersParams,
  AcceptFollowParams,
  GetFollowListResponse,
  SearchUsersResponse,
  CancleFollowParams,
  RejectFollowParams,
  SendedOrReceivedFollowResponse,
  DeleteFollowerParams,
} from './entity';
import followApi from './followApiClient';

export const followList = () => followApi.get<GetFollowListResponse>('/follow/followers');

export const checkReceivedFollow = (pageParam: number) => followApi.get<SendedOrReceivedFollowResponse>(`/follow/requests/receive?page=${pageParam}&pageSize=20`);

export const checkSendedFollow = (pageParam: number) => followApi.get<SendedOrReceivedFollowResponse>(`/follow/requests/send?page=${pageParam}&pageSize=10`);

export const requestFollow = (param: PostFollowerParams) => followApi.post('/follow/requests', {
  userAccount: param.userAccount,
});

export const acceptFollow = (param: AcceptFollowParams) => followApi.post(`/follow/requests/${param.id}/accept`);

export const searchUsers = (keyword: string, pageParam: string) => followApi.get<SearchUsersResponse>(`/users?keyword=${keyword}&${pageParam}&pageSize=10`);

export const cancleFollow = (param: CancleFollowParams) => followApi.delete(`/follow/requests/${param.id}/cancel`);

export const rejectFollow = (param: RejectFollowParams) => followApi.delete(`/follow/requests/${param.id}/reject`);

export const deleteFollow = (param: DeleteFollowerParams) => followApi.delete('/follow/followers', {
  data: { userAccount: param.userAccount },
});

export const recentlyActiveFollow = () => followApi.get<GetFollowListResponse>('/recently-active-followers?pageSize=15');

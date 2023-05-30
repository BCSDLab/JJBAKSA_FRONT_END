import {
  FollowListParams,
  GetFollowListParams,
  CheckSendedFollowParams,
  DeleteFollowerParams,
  PostFollowerParams,
  SearchUsersParams,
  AcceptFollowParams,
  GetFollowListResponse,
  SearchUsersResponse,
} from './entity';
import followApi from './followApiClient';

export const followList = (param: FollowListParams) => followApi.get(`/follow/followers?${param.cursor}&pageSize=${param.pageSize}`);

export const getFollowList = (param: GetFollowListParams) => followApi.get<GetFollowListResponse>(`/follow/requests/receive?page=${param.page}&pageSize=${param.pageSize}`);

export const checkSendedFollow = (param: CheckSendedFollowParams) => followApi.get(`/follow/requests/send?page=${param.page}&pageSize=${param.pageSize}`);

export const requestFollow = (param: PostFollowerParams) => followApi.post('/follow/requests', {
  userAccount: param.userAccount,
});

export const deleteFollower = (param: DeleteFollowerParams) => followApi.delete('/follow/follwers', {
  data: {
    userAccount: param.userAccount,
  },
});

export const acceptFollow = (param: AcceptFollowParams) => followApi.post(`/follow/requests/${param.id}/accept`);

export const searchUsers = (param: SearchUsersParams) => followApi.get<SearchUsersResponse>(`/users?keyword=${param.keyword}`);

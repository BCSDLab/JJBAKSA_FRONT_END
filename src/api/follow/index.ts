import commonApi from './commonApiClients';
import {
  FollowListParams,
  CheckReceivedFollowParams,
  CheckSendedFollowParams,
  FollowerParams,
  SearchUsersParams,
  AcceptFollowParams,
} from './entity';
import followApi from './followApiClient';

export const followList = (param: FollowListParams) => followApi.get(`/followers?${param.cursor}&pageSize=${param.pageSize}`);

export const checkReceivedFollow = (param: CheckReceivedFollowParams) => followApi.get(`/requests/receive?page=${param.page}&pageSize=${param.pageSize}`);

export const checkSendedFollow = (param: CheckSendedFollowParams) => followApi.get(`/requests/send?page=${param.page}&pageSize=${param.pageSize}`);

export const requestFollow = (param: FollowerParams) => followApi.post('/requests', {
  userAccount: param.userAccount,
});

export const deleteFollower = (param: FollowerParams) => followApi.delete('/follwers', {
  data: {
    userAccount: param.userAccount,
  },
});

export const acceptFollow = (param: AcceptFollowParams) => followApi.post(`/requests/${param.id}/accept`);

export const searchUsers = (param: SearchUsersParams) => commonApi.get(`?keyword=${param.keyword}`);

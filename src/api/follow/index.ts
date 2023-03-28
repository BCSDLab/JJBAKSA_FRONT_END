import {
  FollowListParams,
  CheckReceivedFollowParams,
  CheckSendedFollowParams,
  FollowerParams,
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

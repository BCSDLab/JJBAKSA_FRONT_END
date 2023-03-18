import {
  FollowListParams,
  CheckReceivedFollowParams,
  CheckSendedFollowParams,
  FollowRequestParams,
} from './entity';
import followApi from './followApiClient';

export const followList = (param: FollowListParams) => followApi.get(`/followers?${param.cursor}&pageSize=${param.pageSize}`);

export const checkReceivedFollow = (param: CheckReceivedFollowParams) => followApi.get(`/requests/receive?page=${param.page}&pageSize=${param.pageSize}`);

export const checkSendedFollow = (param: CheckSendedFollowParams) => followApi.get(`/requests/send?page=${param.page}&pageSize=${param.pageSize}`);

export const followRequest = (param: FollowRequestParams) => followApi.post('/requests', {
  userAccount: param.userAccount,
});

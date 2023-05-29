export interface FollowListParams {
  cursor: string,
  pageSize: number;
}

export interface FollowResponse {
  account: string,
  email: string,
  id: number,
  nickname: string,
  oauthType: string;
}

export interface GetFollowListParams {
  page: number,
  pageSize: number;
}

export interface CheckSendedFollowParams {
  page: number,
  pageSize: number;
}

export interface FollowerParams {
  userAccount: string;
}

export interface DeleteFollowerParams extends FollowerParams {
}

export interface PostFollowerParams extends FollowerParams {
}

export interface SearchUsersParams {
  keyword: string;
}

export interface AcceptFollowParams {
  id: number;
}

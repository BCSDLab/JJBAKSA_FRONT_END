import { User } from 'api/user/entity';
import { FollowerInfo } from 'pages/Follow/static/entity';

export interface FollowListParams {
  cursor: string;
  pageSize: number;
}

export interface GetFollowListParams {
  page: number;
  pageSize: number;
}

export interface GetFollowListResponse {
  content: {
    id: number;
    follower: User;
    user: User;
    account: string;
  }[]
}

export interface CheckSendedFollowParams {
  page: number;
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

export interface SearchUsersResponse {
  content: FollowerInfo[]
}

export interface AcceptFollowParams {
  id: number;
}

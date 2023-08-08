import { User } from 'api/user/entity';
import { FollowerInfo } from 'pages/Follow/static/entity';

export interface FollowListParams {
  cursor: string;
  pageSize: number;
}

export interface GetFollowListResponse {
  content: {
    account: string;
    email: string;
    id: number;
    nickname: string;
    userType: string;
  }[]
}

export interface SendedOrReceivedFollowParams {
  page: number;
  pageSize: number;
}

export interface SendedOrReceivedFollowResponse {
  content: {
    id: number;
    follower: User;
    user: User;
  }[];
  empty: boolean;
  last: boolean;
  number: number;
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

export interface RequestFollowParams {
  id: number;
}

export interface AcceptFollowParams extends RequestFollowParams {
}

export interface CancleFollowParams extends RequestFollowParams {
}

export interface RejectFollowParams extends RequestFollowParams {
}

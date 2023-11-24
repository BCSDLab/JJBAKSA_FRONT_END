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
    userCountResponse: {
      id: number;
      reviewCount: number;
      friendCount: number;
    }
  }[];
  empty: boolean;
  last: boolean;
  number: number;
}

export interface SentOrReceivedFollowParams {
  page: number;
  pageSize: number;
}

export interface SentOrReceivedFollowResponse {
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
  content: FollowerInfo[];
  empty: boolean;
  last: boolean;
  number: number;
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

export interface GetFollowReviewResponse {
  content: {
    name: string;
    placeId: string;
    photos?: string[];
    shopId: number;
    category: string;
  }[]
  empty: boolean;
  first: boolean;
  last: boolean;
}

export interface GetDetailReviewResponse {
  content: {
    content: string;
    createdAt: string;
    id: number;
    rate: number;
  }[];
  empty: boolean;
  first: boolean;
  last: boolean;
}

export interface GetFollowerReviewCountParam {
  id: number;
}

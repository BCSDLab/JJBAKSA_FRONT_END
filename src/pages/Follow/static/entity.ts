export type FollowerInfo = Omit<Follower, 'email'>;

export interface Follower {
  account: string,
  nickname: string,
  followedType: 'FOLLOWED' | 'NONE' | 'REQUEST_RECEIVE' | 'REQUEST_SENT',
  id: number,
  email: string,
  userType: string;
  requestId?: number;
  userCountResponse?: {
    id: number;
    reviewCount: number;
    friendCount: number;
  },
  profileImage?: {
    id: number,
    originalName: string,
    path: string,
    url: string
  },
}

export interface RequestUserInfo {
  account: string,
  email: string,
  id: number,
  nickname: string;
}

export interface ReceiveInfo {
  id: number,
  user: RequestUserInfo;
}
export interface SearchPageInfo {
  data: FollowerInfo[],
}

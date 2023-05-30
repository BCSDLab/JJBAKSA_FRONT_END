export type FollowerInfo = Omit<Follower, 'email'>;

export interface Follower {
  account: string,
  nickname: string,
  followedType: 'FOLLOWED' | 'NONE' | 'RECEIVED',
  id: number,
  email: string,
  userType: string;
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

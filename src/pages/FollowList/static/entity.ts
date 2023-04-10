export interface FollowerInfo {
  account: string,
  nickname: string,
  followedType?: string,
  id?: number,
  email?: string,
  userType?: string;
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

export interface FollowListInfo {
  title: string;
  data?: FollowerInfo[];
  user?: ReceiveInfo[];
}

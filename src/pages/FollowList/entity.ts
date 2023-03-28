export interface FollowerInfo {
  account: string,
  nickname: string,
  id?: number,
  email?: string,
  userType?: string;
}

export interface ReceiveInfo {
  createdAt: number,
  follower: FollowerInfo,
  id: number,
  user: FollowerInfo;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshResponse extends ILoginResponse {}

export interface ILoginParams {
  account: string;
  password: string;
}

export interface IRegisterParams extends ILoginParams {
  email: string;
}

export interface IModifyParams {
  nickname?: string;
  password?: string;
  email?: string;
}

export interface IUser {
  account: string;
  nickname: string;
  email: string;
  id: number;
  // 아래 두 파라미터도 확실한 도메인이 정해지면 수정 필요.
  // oauthType = 'KAKAO' | 'NAVER' | 'GOOGLE'...
  // userType = 'ADMIN' | 'NORMAL'...
  oauthType: string;
  userType: string;
}

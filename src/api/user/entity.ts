export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse extends LoginResponse {}

export interface LoginParams {
  account: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  email: string;
}

export interface CheckIdDuplicateParams {
  account?: string;
  email?: string;
}

export interface ModifyParams {
  nickname?: string;
  password?: string;
  email?: string;
}

export interface User {
  account: string;
  id: number;
  nickname: string;
  email: string;
  profileImage: {
    id: number;
    path: string;
    originalName: string;
    url: string;
  },
  oauthType: string; // 'KAKAO' | 'NAVER' | 'GOOGLE'
  userType: string; // 'ADMIN' | 'NORMAL'...
  userCountResponse: {
    id: number;
    reviewCount: number;
    friendCount: number;
  };
  followedType?: 'FOLLOWED' | 'NONE' | 'REQUEST_RECEIVE' | 'REQUEST_SENT',
}

export interface SendRegisterEmailParams {
  email: string;
}

export type SendFindEmailParams = SendRegisterEmailParams;

export interface GetAccountParams {
  email: string;
  code: string;
}

export interface FindPasswordParams {
  account: string,
  code: string,
  email: string,
}

export interface ChangePasswordParams {
  password: string
}

export interface CheckPasswordParams {
  password: string
}

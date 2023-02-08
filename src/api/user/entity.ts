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
  nickname: string;
  email: string;
  id: number;
  // 아래 두 파라미터도 확실한 도메인이 정해지면 수정 필요.
  // oauthType = 'KAKAO' | 'NAVER' | 'GOOGLE'...
  // userType = 'ADMIN' | 'NORMAL'...
  oauthType: string;
  userType: string;
  userCountResponse: {
    id: number;
    reviewCount: number;
    friendCount: number;
  };
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

export interface EmailParams {
  email: string,
  account?: string
}

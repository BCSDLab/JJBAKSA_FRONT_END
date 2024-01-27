// import makeToast from 'utils/ts/makeToast';
import { AccountParams, EmailParams } from 'pages/Auth/FindIdPassword/entity';

import {
  CheckIdDuplicateParams,
  CheckPasswordParams,
  FindPasswordParams,
  GetAccountParams,
  LoginParams,
  LoginResponse,
  ModifyParams,
  RegisterParams,
  SendFindEmailParams,
  SendRegisterEmailParams,
  User,
} from './entity';
import { userAccessApi, userApi } from './userApiClient';

export const register = (param: RegisterParams) => userApi.post<User>('/', param);

export const checkIdDuplicate = (param: CheckIdDuplicateParams) => userAccessApi.get<User>(`/exists?account=${param.account}`);

export const login = async (param: LoginParams) => {
  const { data } = await userApi.post<LoginResponse>('/login', param);
  return { data };
};

export const getMe = () => userAccessApi.get<User>('/me');

export const withdrawUser = () => userAccessApi.delete<User>('/me');

export const modify = (param: ModifyParams) => userAccessApi.patch<User>('/me', param);

export const sendRegisterEmail = (param: SendRegisterEmailParams) => userAccessApi.post(`/authenticate?email=${param.email}`);

export const sendFindEmail = (param: SendFindEmailParams) => userAccessApi.post(`/email/account?email=${param.email}`);

export const getAccount = (param: GetAccountParams) => userAccessApi.get(`/account?email=${param.email}&code=${param.code}`);

export const findPassword = (param: FindPasswordParams) => userAccessApi.post('/password', {
  account: param.account,
  code: param.code,
  email: param.email,
});

export const checkPassword = (param: CheckPasswordParams) => userAccessApi.post(`/check-password?password=${param.password}`);

export const emailPassword = (Param: EmailParams) => userAccessApi.post(`/email/password?account=${Param.account}&email=${Param.email}`);

export const emailId = (Param : EmailParams) => userAccessApi.post(`/email/account?email=${Param.email}`);

export const findId = (Param : AccountParams) => userAccessApi.get(`/account?email=${Param.email}&code=${Param.code}`);

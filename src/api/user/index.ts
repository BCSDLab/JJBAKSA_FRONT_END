// import makeToast from 'utils/ts/makeToast';
import { AccountParams, EmailParams } from 'pages/Auth/FindIdPassword/entity';
import {
  CheckIdDuplicateParams,
  LoginParams,
  LoginResponse,
  ModifyParams,
  RegisterParams,
  SendRegisterEmailParams,
  SendFindEmailParams,
  GetAccountParams,
  FindPasswordParams,
  User,
  CheckPasswordParams,
} from './entity';
import userApi from './userApiClient';

export const register = (param: RegisterParams) => userApi.post<User>('/', param);

export const checkIdDuplicate = (param: CheckIdDuplicateParams) => userApi.get<User>(`/exists?account=${param.account}`);

export const login = async (param: LoginParams) => {
  const { data } = await userApi.post<LoginResponse>('/login', param);
  return { data };
};

export const getMe = () => userApi.get<User>('/me');

export const withdrawUser = () => userApi.delete<User>('/me');

export const modify = (param: ModifyParams) => userApi.patch<User>('/me', param);

export const sendRegisterEmail = (param: SendRegisterEmailParams) => userApi.post(`/authenticate?email=${param.email}`);

export const sendFindEmail = (param: SendFindEmailParams) => userApi.post(`/email/account?email=${param.email}`);

export const getAccount = (param: GetAccountParams) => userApi.get(`/account?email=${param.email}&code=${param.code}`);

export const findPassword = (param: FindPasswordParams) => userApi.post('/password', {
  account: param.account,
  code: param.code,
  email: param.email,
});

export const checkPassword = (param: CheckPasswordParams) => userApi.post(`/check-password?password=${param.password}`);

export const emailPassword = (Param: EmailParams) => userApi.post(`/email/password?account=${Param.account}&email=${Param.email}`);

export const emailId = (Param : EmailParams) => userApi.post(`/email/account?email=${Param.email}`);

export const findId = (Param : AccountParams) => userApi.get(`/account?email=${Param.email}&code=${Param.code}`);

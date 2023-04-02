// import makeToast from 'utils/ts/makeToast';
import {
  CheckIdDuplicateParams,
  LoginParams,
  LoginResponse,
  ModifyParams,
  RegisterParams,
  User,
  SendRegisterEmailParams,
  SendFindEmailParams,
  GetAccountParams,
  FindPasswordParams,
  ChangePasswordParams,
} from './entity';
import userApi from './userApiClient';

export const register = (param: RegisterParams) => userApi.post<User>('/', param);

export const checkIdDuplicate = (param: CheckIdDuplicateParams) => userApi.get<User>(`/exists?account=${param.account}`);

export const login = async (param: LoginParams) => {
  const { data } = await userApi.post<LoginResponse>('/login', param);
  return { data };
};

export const getMe = () => userApi.get<User>('/me');

export const modify = (param: ModifyParams) => userApi.patch<User>('/modify', param);

export const sendRegisterEmail = (param: SendRegisterEmailParams) => userApi.post(`/authenticate?email=${param.email}`);

export const sendFindEmail = (param: SendFindEmailParams) => userApi.post(`/email?email=${param.email}`);

export const getAccount = (param: GetAccountParams) => userApi.get(`/account?email=${param.email}&code=${param.code}`);

export const findPassowrd = (param: FindPasswordParams) => userApi.post('/password', {
  account: param.account,
  code: param.code,
  email: param.email,
});

export const changePassword = (param: ChangePasswordParams) => userApi.patch(`/password?password=${param.password}`);

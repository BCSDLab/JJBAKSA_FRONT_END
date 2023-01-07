// import makeToast from 'utils/ts/makeToast';
import userApi from './userApiClient';
import {
  CheckIdDuplicateParams,
  LoginParams, LoginResponse, ModifyParams, RegisterParams, User,
  EmailInfo, AccountInfo,
} from './entity';

export const register = (param: RegisterParams) => userApi.post<User>('/', param);

export const checkIdDuplicate = (param: CheckIdDuplicateParams) => userApi.get<User>(`/exists?account=${param.account}`);

export const login = async (param: LoginParams) => {
  const { data } = await userApi.post<LoginResponse>('/login', param);
  return { data };
};

export const getMe = () => userApi.get<User>('/me');

export const modify = (param: ModifyParams) => userApi.patch<User>('/modify', param);

export const sendEmail = (param: EmailInfo) => userApi.post(`/email?email=${param.email}`);

export const getAccount = (param: AccountInfo) => userApi.get(`/account?email=${param.email}&code=${param.code}`);

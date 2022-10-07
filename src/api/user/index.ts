import makeToast from 'utils/ts/makeToast';
import userApi from './userApiClient';
import {
  LoginParams, LoginResponse, ModifyParams, RegisterParams, User,
} from './entity';

export const register = (param: RegisterParams) => userApi.post<User>('/', param);

export const login = async (param: LoginParams) => {
  try {
    const { data } = await userApi.post<LoginResponse>('/login', param);
    return { data };
  } catch {
    makeToast('warning', '아이디와 비밀번호를 확인해주세요.');
    return Promise.reject();
  }
};

export const getMe = () => userApi.get<User>('/me');

export const modify = (param: ModifyParams) => userApi.patch<User>('/modify', param);

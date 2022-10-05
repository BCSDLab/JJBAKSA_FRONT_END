import userApi from './userApiClient';
import {
  LoginParams, LoginResponse, ModifyParams, RegisterParams, User,
} from './entity';

export const register = (param: RegisterParams) => userApi.post<User>('/', param);

export const login = (param: LoginParams) => userApi.post<LoginResponse>('/login', param);

export const getMe = () => userApi.get<User>('/me');

export const modify = (param: ModifyParams) => userApi.patch<User>('/modify', param);

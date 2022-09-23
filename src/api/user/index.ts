import userApi from './userApiClient';
import {
  ILoginParams, ILoginResponse, IModifyParams, IRegisterParams, IUser,
} from './entity';

export const register = (param: IRegisterParams) => userApi.post<IUser>('/', param);

export const login = (param: ILoginParams) => userApi.post<ILoginResponse>('/login', param);

export const getMe = () => userApi.get<IUser>('/me');

export const modify = (param: IModifyParams) => userApi.patch<IUser>('/modify', param);

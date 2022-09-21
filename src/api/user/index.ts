import userApi from './userApiClient';
import {
  ILoginParams, ILoginResponse, IModifyParams, IRegisterParams, ISearchQueryParams, IUser,
} from './entity';
import searchApi from './searchApiClient';

export const register = (param: IRegisterParams) => userApi.post<IUser>('/', param);

export const login = (param: ILoginParams) => userApi.post<ILoginResponse>('/login', param);

export const getMe = () => userApi.get<IUser>('/me');

export const modify = (param: IModifyParams) => userApi.patch<IUser>('/modify', param);

// 검색창에서 쿼리에 대한 리스트 받아오기
export const querySeachText = (param : ISearchQueryParams) => searchApi.get(`/search/${param}`);

import userApi from 'api/user/userApiClient';
import { EmailInfo, AccountInfo } from '../entity';

export const sendEmail = (param: EmailInfo) => userApi.post(`/email?email=${param.email}`);

export const getAccount = (param: AccountInfo) => userApi.get(`/account?email=${param.email}&code=${param.code}`);

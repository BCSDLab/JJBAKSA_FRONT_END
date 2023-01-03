import userApi from 'api/user/userApiClient';
import { EmailInfo } from '../entity';

export const sendEmail = (param: EmailInfo) => userApi.post(`/email?email=${param.email}`);

export const getAccount = (param: { email: string, code: string }) => userApi.get(`/account?email=${param.email}&code=${param.code}`);

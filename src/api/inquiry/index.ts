import { GetInquiryResponse } from './entity';
import inquiryApi from './inquiryApiClient';

const getInquiry = async (dateCursor: string | null, idCursor: number | null, size: number = 9) => {
  const { data } = await inquiryApi.get<GetInquiryResponse>(`/inquiry?dateCursor=${dateCursor}&idCursor=${idCursor}&size=${size}`);
  return data;
};

export default getInquiry;

import { GetInquiryResponse } from './entity';
import inquiryApi from './inquiryApiClient';

const getInquiry = async (dateCursor: string | null, idCursor: number | null) => {
  const { data } = await inquiryApi.get<GetInquiryResponse>(`/inquiry?dateCursor=${dateCursor}&idCursor=${idCursor}&size=8`);
  return data;
};

export default getInquiry;

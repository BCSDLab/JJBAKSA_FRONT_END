import { GetInquiryResponse, InquiryProps } from '../entity';
import inquiryApi from '../inquiryApiClient';

const getInquiry = async ({
  queryType, dateCursor, idCursor, size,
}: InquiryProps) => {
  const queryParams = `${queryType}?dateCursor=${dateCursor}&idCursor=${idCursor}&size=${size}`;
  const { data } = await inquiryApi.get<GetInquiryResponse>(`/inquiry${queryParams}`);

  return data;
};

export default getInquiry;

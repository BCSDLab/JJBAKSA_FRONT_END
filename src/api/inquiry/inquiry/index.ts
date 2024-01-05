import { GetInquiryResponse, InquiryProps } from '../entity';
import inquiryApi from '../inquiryApiClient';

const getInquiry = async ({
  queryType, dateCursor, idCursor, size,
}: InquiryProps) => {
  try {
    const queryParams = `${queryType}?dateCursor=${dateCursor}&idCursor=${idCursor}&size=${size}`;
    const { data } = await inquiryApi.get<GetInquiryResponse>(`/inquiry${queryParams}`);
    return data;
  } catch (error) {
    return null;
  }
};

export default getInquiry;

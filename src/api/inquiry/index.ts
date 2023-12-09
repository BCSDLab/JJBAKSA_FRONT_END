import { GetInquiryResponse, InquiryProps } from './entity';
import inquiryApi from './inquiryApiClient';

const getInquiry = async ({
  queryType: typePath, dateCursor, idCursor, size,
}: InquiryProps) => {
  try {
    const queryParams = `${typePath}?dateCursor=${dateCursor}&idCursor=${idCursor}&size=${size}`;
    const { data } = await inquiryApi.get<GetInquiryResponse>(`/inquiry${queryParams}`);
    return data;
  } catch (error) {
    return null;
  }
};

export default getInquiry;

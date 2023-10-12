import { GetInquiryResponse } from './entity';
import inquiryApi from './inquiryApiClient';

interface InquiryProps {
  typePath: string;
  dateCursor: string | null;
  idCursor: number | null;
  size: number;
}

const getInquiry = async ({
  typePath, dateCursor, idCursor, size,
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

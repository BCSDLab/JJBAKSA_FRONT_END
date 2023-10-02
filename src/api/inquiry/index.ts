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
  const queryParams = `?dateCursor=${dateCursor}&idCursor=${idCursor}&size=${size}`;

  const { data } = await inquiryApi.get<GetInquiryResponse>(`/inquiry${typePath}${queryParams}`);
  return data;
};

export default getInquiry;

import getInquiry from 'api/inquiry';
import { useQuery } from 'react-query';

interface InquiryProps {
  typePath: string;
  dateCursor: string | null;
  idCursor: number | null;
  size: number;
}

const useInquiryList = ({
  typePath, dateCursor, idCursor, size,
}: InquiryProps) => {
  const queryKey = ['Inquiry', dateCursor, idCursor, size];
  const { isLoading, isError, data } = useQuery(queryKey, () => getInquiry({
    typePath, dateCursor, idCursor, size,
  }));

  return {
    isLoading, isError, data,
  };
};

export default useInquiryList;

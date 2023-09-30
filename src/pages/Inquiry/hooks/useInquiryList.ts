import getInquiry from 'api/inquiry';
import { useQuery } from 'react-query';

const useInquiryList = (dateCursor: string | null, idCursor: number | null, size: number) => {
  const {
    isLoading, isError, data,
  } = useQuery(['Inquiry', dateCursor, idCursor, size], () => getInquiry(dateCursor, idCursor, size));

  return {
    isLoading, isError, data,
  };
};

export default useInquiryList;

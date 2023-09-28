import getInquiry from 'api/inquiry';
import { useQuery } from 'react-query';

const useInquiryList = (dateCursor: string | null, idCursor: number | null) => {
  const {
    isLoading, isError, data,
  } = useQuery(['Inquiry', dateCursor, idCursor], () => getInquiry(dateCursor, idCursor));

  return {
    isLoading, isError, data,
  };
};

export default useInquiryList;

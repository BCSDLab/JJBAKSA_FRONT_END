import getInquiry from 'api/inquiry';
import { InquiryProps } from 'api/inquiry/entity';
import { useQuery } from 'react-query';

const useInquiryList = ({
  typePath, dateCursor, idCursor, size,
}: InquiryProps) => {
  const queryKey = ['Inquiry', typePath, dateCursor, idCursor, size];
  const { isLoading, isError, data } = useQuery(queryKey, () => getInquiry({
    typePath, dateCursor, idCursor, size,
  }), {
    refetchOnMount: 'always',
  });

  return {
    isLoading, isError, data,
  };
};

export default useInquiryList;

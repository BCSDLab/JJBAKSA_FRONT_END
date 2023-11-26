import getInquiry from 'api/inquiry';
import { useQuery } from '@tanstack/react-query';
import { InquiryProps } from 'api/inquiry/entity';

const useInquiryList = ({
  queryType, dateCursor, idCursor, size,
}: InquiryProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['Inquiry', queryType, dateCursor, idCursor, size],
    queryFn: () => getInquiry({
      queryType, dateCursor, idCursor, size,
    }),
    refetchOnMount: 'always',
  });

  return {
    isLoading, isError, data,
  };
};

export default useInquiryList;

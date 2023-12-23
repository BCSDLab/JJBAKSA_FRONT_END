import getInquiry from 'api/inquiry/inquiry';
import { useQuery } from '@tanstack/react-query';
import { InquiryProps } from 'api/inquiry/entity';

const useInquiryList = ({
  queryType, dateCursor, idCursor, size,
}: InquiryProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['inquiry'],
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

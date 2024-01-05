import getInquiry from 'api/inquiry/inquiry';
import { useQuery } from '@tanstack/react-query';
import { InquiryProps } from 'api/inquiry/entity';

const useGetInquiry = ({
  queryType, dateCursor, idCursor, size,
}: InquiryProps) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['inquiry'],
    queryFn: () => getInquiry({
      queryType, dateCursor, idCursor, size,
    }),
  });

  return {
    data, isLoading, refetch,
  };
};

export default useGetInquiry;

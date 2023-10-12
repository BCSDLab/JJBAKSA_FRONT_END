import getInquiry from 'api/inquiry';
import { useQuery, useQueryClient } from 'react-query';

interface InquiryProps {
  typePath: string;
  dateCursor: string | null;
  idCursor: number | null;
  size: number;
}

const useInquiryList = ({
  typePath, dateCursor, idCursor, size,
}: InquiryProps) => {
  const queryKey = ['Inquiry', typePath, dateCursor, idCursor, size];
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery(queryKey, () => getInquiry({
    typePath, dateCursor, idCursor, size,
  }));

  async function refetchInquiryData() {
    if (!data) {
      await queryClient.invalidateQueries(queryKey);
    }
  }

  return {
    isLoading, isError, data, refetchInquiryData,
  };
};

export default useInquiryList;

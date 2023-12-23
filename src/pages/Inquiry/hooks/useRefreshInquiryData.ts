import { useQueryClient } from '@tanstack/react-query';

const useRefreshInquiryData = () => {
  const queryClient = useQueryClient();
  const refreshData = () => queryClient.invalidateQueries({ queryKey: ['inquiry'] });

  return refreshData;
};

export default useRefreshInquiryData;

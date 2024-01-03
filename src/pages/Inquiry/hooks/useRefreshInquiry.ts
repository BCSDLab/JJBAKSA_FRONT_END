import { useQueryClient } from '@tanstack/react-query';

const useRefreshInquiry = () => {
  const queryClient = useQueryClient();
  const refreshData = () => queryClient.invalidateQueries({ queryKey: ['inquiry'] });

  return refreshData;
};

export default useRefreshInquiry;

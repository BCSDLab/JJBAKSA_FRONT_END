import { useQuery } from '@tanstack/react-query';

import { getReviewedShops } from 'api/mypage';

const useReviwedShops = () => {
  const { isLoading, isError, data } = useQuery({ queryKey: ['reviewedShops'], queryFn: () => getReviewedShops() });

  return { isLoading, isError, shops: data ? data.data.content : [] };
};

export default useReviwedShops;

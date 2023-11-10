import { getReviewedShops } from 'api/mypage';
import { useSuspenseQuery } from '@tanstack/react-query';

const useReviwedShops = () => {
  const { isLoading, isError, data } = useSuspenseQuery({ queryKey: ['reviewedShops'], queryFn: () => getReviewedShops() });

  return { isLoading, isError, shops: data.data.content };
};

export default useReviwedShops;

import { getReviewedShops } from 'api/mypage';
import { useQuery } from '@tanstack/react-query';

const useReviwedShops = () => {
  const { isLoading, isError, data } = useQuery({ queryKey: ['reviewedShops'], queryFn: () => getReviewedShops() });
  const shops = data ? data.data.content : [];
  return { isLoading, isError, shops };
};

export default useReviwedShops;

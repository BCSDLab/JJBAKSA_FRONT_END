import { getFollowerReviewCount } from 'api/follow';
import { useQuery } from '@tanstack/react-query';

const useGetFollowerReviewCount = (id: number) => {
  const { data } = useQuery({ queryKey: ['reviewCount'], queryFn: () => getFollowerReviewCount({ id }) });
  return data;
};

export default useGetFollowerReviewCount;

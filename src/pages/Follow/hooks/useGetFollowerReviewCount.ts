import { getFollowerReviewCount } from 'api/follow';
import { useQuery } from 'react-query';

const useGetFollowerReviewCount = (id: number) => {
  const { data } = useQuery(['reviewCount', id], () => getFollowerReviewCount({ id }));
  return data;
};

export default useGetFollowerReviewCount;

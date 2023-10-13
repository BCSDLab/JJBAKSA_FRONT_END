import { recentlyActiveFollow } from 'api/follow';
import { useQuery } from 'react-query';

// 최대 15명만 보임, 접속한지 24시가 지나면 사라짐
const useGetRecentlyActiveFollower = () => {
  const { data, isLoading } = useQuery('recent', () => recentlyActiveFollow());

  return { data, isLoading };
};

export default useGetRecentlyActiveFollower;

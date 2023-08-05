import { getScraps } from 'api/mypage';
import { useQuery } from 'react-query';

const useScraps = () => {
  const { data, isLoading } = useQuery('scraps', getScraps);
  const scraps = data ? data.data.content : [];
  return { scraps, isLoading };
};

export default useScraps;

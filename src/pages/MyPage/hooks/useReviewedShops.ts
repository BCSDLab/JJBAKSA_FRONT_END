import { getReviewedShops } from 'api/mypage';
import { useQuery } from 'react-query';

const useReviwedShops = () => {
  const { isLoading, isError, data } = useQuery('reviewedShops', () => getReviewedShops());
  const shops = data ? data.data.content : [];
  return { isLoading, isError, shops };
};

export default useReviwedShops;

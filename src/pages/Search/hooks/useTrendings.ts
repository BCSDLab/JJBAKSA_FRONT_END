import { fetchTrendings } from 'api/search';
import { useQuery } from 'react-query';

const useTrendingList = () => {
  const {
    isLoading, isError, data,
  } = useQuery('trending', fetchTrendings);
  const trendings = data?.data.trendings;
  return {
    isLoading, isError, data: trendings,
  };
};

export default useTrendingList;

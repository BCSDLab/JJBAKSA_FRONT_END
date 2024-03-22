import { useQuery } from '@tanstack/react-query';

import { fetchTrendings } from 'api/shop';

const useTrendingList = () => {
  const {
    isLoading, isError, data,
  } = useQuery({ queryKey: ['trending'], queryFn: fetchTrendings });
  const trendings = data?.data.trendings;
  const precessedTrendings = trendings?.map((trending) => {
    if (trending.indexOf('?') === -1) {
      return trending;
    }
    return trending.slice(0, trending.indexOf('?'));
  });

  return {
    isLoading, isError, data: precessedTrendings,
  };
};

export default useTrendingList;

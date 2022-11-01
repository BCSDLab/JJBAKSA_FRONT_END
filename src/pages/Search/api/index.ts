import { useQuery } from 'react-query';
import searchApi from './search/searchApiClient';
// import searchApi from './search/searchApiClient';

export function useTrendingQuery() {
  const {
    isLoading, isError, data,
  } = useQuery('trending', () => searchApi.get('/trending'));
  const trendings = data?.data.trendings;
  return {
    isLoading, isError, trendings,
  };
}

export function useShopQuery(place_id: string) {
  const {
    isLoading, isError, data,
  } = useQuery('shop', () => searchApi.get(`/shop?place_id=${place_id}`));
  return {
    isLoading, isError, data,
  };
}

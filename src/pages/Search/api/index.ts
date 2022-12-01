import { useQuery } from 'react-query';
import useGeolocation from 'utils/hooks/useGeolocation';
import searchApi from './search/searchApiClient';

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

export function useFetchShops(searchQuery: string) {
  const options = {
    maximumAge: 10000,
  };
  const { location } = useGeolocation(options);
  const {
    isLoading, isError, data, refetch,
  } = useQuery('shop', () => searchApi.post(`/shops?keyword=${searchQuery}&x=${location?.coords.latitude}&y=${location?.coords.longitude}`));
  return {
    isLoading, isError, data, refetch,
  };
}

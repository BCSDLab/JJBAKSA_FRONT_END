import { useQuery } from 'react-query';
import useGeolocation from 'utils/hooks/useGeolocation';
import searchApi from './searchApiClient';

export const useTrendingList = () => {
  const {
    isLoading, isError, data,
  } = useQuery('trending', () => searchApi.get('/trending'));
  const trendings = data?.data.trendings;
  return {
    isLoading, isError, data: trendings,
  };
};

export const useShopQuery = (place_id: string) => useQuery(['shop', place_id], () => searchApi.get(`/shop?place_id=${place_id}`));

export const useFetchShops = (searchQuery: string) => {
  const options = {
    maximumAge: 1000,
  };
  const { location } = useGeolocation(options);
  const {
    isLoading, isError, data, refetch,
  } = useQuery('shop', () => searchApi.post(`/shops?keyword=${searchQuery}&x=${location?.coords.latitude}&y=${location?.coords.longitude}`), { enabled: !!location });
  const isFetching = !isLoading && !(location);
  const shops = data?.data.content;
  return {
    isFetching, isError, data: shops, refetch,
  };
};

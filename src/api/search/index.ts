import { useQuery } from 'react-query';
import useGeolocation from 'utils/hooks/useGeolocation';
import { ShopParams } from './entity';
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

export const getShop = (param: ShopParams) => searchApi.get(`/shop?place_id=${param}`);

export const useFetchShops = (searchQuery: string) => {
  const options = {
    maximumAge: 1000,
  };
  const { location } = useGeolocation(options);
  const {
    isLoading, isError, data, refetch,
  } = useQuery('shop', () => searchApi.post(`/shops?keyword=${searchQuery}&x=${location?.latitude}&y=${location?.longitude}`), { enabled: !!location });

  const isFetching = isLoading || !(location);
  const shops = data?.data.content;

  return {
    isFetching, isError, data: shops, refetch,
  };
};

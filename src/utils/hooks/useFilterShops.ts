import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { getFilterShops } from 'api/shop';
import { FilterShopsListResponse, FilterShopsParams } from 'api/shop/entity';
import { useAuth } from 'store/auth';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import useGeolocation from 'utils/hooks/useGeolocation';
import makeToast from 'utils/ts/makeToast';

const OPTIONS = { maximumAge: 1000 };

const useFilterShops = () => {
  const { location } = useGeolocation(OPTIONS);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setFilterFriend } = useFilterFriend();
  const { setFilterScrap } = useFilterScrap();
  const { setFilterNearby } = useFilterNearby();
  const [filterShops, setfilterShops] = useState<FilterShopsListResponse | null>(null);
  const auth = useAuth();
  const {
    isPending, isError, mutate: filterButtons,
  } = useMutation({
    mutationFn: (param: FilterShopsParams) => getFilterShops(param, {
      lat: location?.lat,
      lng: location?.lng,
    }),
    onSuccess: (res) => {
      if (auth) {
        queryClient.invalidateQueries({ queryKey: ['filterShops'] });
        setfilterShops(res.data);
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        makeToast('error', '로그인 후 이용해 보세요');
        navigate('/login');
        setFilterFriend(true);
        setFilterScrap(true);
        setFilterNearby(true);
      }
    },
  });

  return {
    isPending, isError, filterShops, filterButtons,
  };
};

export default useFilterShops;

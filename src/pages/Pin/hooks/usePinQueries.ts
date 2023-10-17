import {
  getFollowersReview, getMyReview, latestFollowerReview, latestMyReview,
} from 'api/review';
import { fetchShop } from 'api/shop';
import { useEffect, useState } from 'react';
import { useQueries } from 'react-query';

interface QueryParam {
  placeId:string,
  sortType:string
}
const usePinQueries = ({ placeId, sortType }:QueryParam) => {
  const [rateValue, setRateValue] = useState <string>('0');
  const queries = useQueries([
    { queryKey: ['pinInfo', placeId], queryFn: async () => fetchShop(placeId) },
    { queryKey: ['latestMy', placeId], queryFn: async () => latestMyReview(placeId) },
    { queryKey: ['latestFollower', placeId], queryFn: async () => latestFollowerReview(placeId) },
    { queryKey: ['myReview', placeId, sortType], queryFn: async () => getMyReview({ placeId, sort: sortType }) },
    { queryKey: ['followerReview', placeId, sortType], queryFn: async () => getFollowersReview({ placeId, sort: sortType }) },
  ]);

  useEffect(() => {
    if (queries[0].data?.totalRating
        && queries[0].data?.ratingCount) {
      setRateValue(Math.floor((queries[0].data?.totalRating || 0)
      / (queries[0].data?.ratingCount || 1)).toFixed(1));
    }
  }, [queries]);
  return { queries, rateValue };
};

export default usePinQueries;

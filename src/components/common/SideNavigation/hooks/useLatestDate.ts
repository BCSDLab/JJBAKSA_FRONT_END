import { useQuery } from '@tanstack/react-query';

import { fetchFollowerLatestDate, fetchMyLatestDate } from 'api/review';
import formatISODate from 'utils/ts/formatISODate';

const useLatestDate = (placeId: string) => {
  const {
    data: latestFollowerDate,
  } = useQuery({
    queryKey: ['latestFollowerDate', placeId],
    queryFn: () => fetchFollowerLatestDate(placeId),
  });

  const {
    data: latestMyDate,
  } = useQuery({
    queryKey: ['latestMyDate', placeId],
    queryFn: () => fetchMyLatestDate(placeId),
  });

  const latestDate = () => {
    const {
      year: myYear, month: myMonth, day: myDay,
    } = formatISODate(String(latestMyDate?.data.lastDate));
    const myDate = new Date(myYear, myMonth, myDay);

    const {
      year: followerYear, month: followerMonth, day: followerDay,
    } = formatISODate(String(latestFollowerDate?.data.lastDate));
    const followerDate = new Date(followerYear, followerMonth, followerDay);

    if (followerDate && myDate) {
      return followerDate >= myDate ? latestMyDate?.data.lastDate : latestMyDate?.data.lastDate;
    }

    return latestFollowerDate?.data.lastDate || latestMyDate?.data.lastDate || null;
  };

  const date = latestDate();

  return { date };
};

export default useLatestDate;

import { useMemo, useState } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import StarRateContext from './StarRateContext';
import EnterStarRateContainer from './EnterStarRateContainer';
import LeaveStarRateContainer from './LeaveStarRateContainer';

export interface StarRatingType {
  getRate: (rating: number) => void,
}

export default function StarRating({ getRate }: StarRatingType) {
  const [rating, setRating] = useState(0);
  const [entered, enter, leave] = useBooleanState(false);

  const value = useMemo(() => ({
    handleMouseEnter: enter,
    handleMouseLeave: leave,
    handleClick: (num: number) => {
      setRating(num);
      getRate(num);
    },
  }), [getRate, enter, leave]);

  return (
    <StarRateContext.Provider value={value}>
      {entered ? (
        <EnterStarRateContainer rating={rating} />
      ) : (
        <LeaveStarRateContainer rating={rating} />
      )}
    </StarRateContext.Provider>
  );
}

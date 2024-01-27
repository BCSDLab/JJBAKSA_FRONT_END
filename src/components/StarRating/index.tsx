import { useMemo } from 'react';

import EnterStarRateContainer from 'components/StarRating/EnterStarRateContainer';
import LeaveStarRateContainer from 'components/StarRating/LeaveStarRateContainer';
import StarRateContext from 'components/StarRating/StarRateContext';
import { useRate } from 'store/review';
import useBooleanState from 'utils/hooks/useBooleanState';

export default function StarRating({ onClick }: { onClick: () => void }) {
  const [rating, setRating] = useRate();
  const [entered, enter, leave] = useBooleanState(false);

  const value = useMemo(() => ({
    handleMouseEnter: enter,
    handleMouseLeave: leave,
    handleClick: (num: number) => {
      setRating(num);
      onClick?.();
    },
  }), [onClick, enter, leave, setRating]);

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

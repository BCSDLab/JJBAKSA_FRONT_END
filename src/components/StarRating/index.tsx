import { useMemo } from 'react';
import useBooleanState from 'utils/hooks/useBooleanState';
import { useRate } from 'store/review';
import StarRateContext from './StarRateContext';
import EnterStarRateContainer from './EnterStarRateContainer';
import LeaveStarRateContainer from './LeaveStarRateContainer';

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

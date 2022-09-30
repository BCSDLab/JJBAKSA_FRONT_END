import { ReactComponent as Star } from 'assets/svg/star.svg';
import {
  createContext, useMemo, useState,
} from 'react';
import useContext from '../../utils/hooks/useContext';
import styles from './StarRating.module.scss';

interface StarRateContextType {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleClick: (num: number) => void;
}
interface Props {
  onClick: () => void;
}

export const StarRateContext = createContext<StarRateContextType | null>(null);

function LeaveStarRateContainer({ rating }: { rating: number }) {
  const { handleMouseEnter } = useContext(StarRateContext);
  return (
    <div
      className={styles.starRateContainer}
      onMouseEnter={handleMouseEnter}
    >
      { [1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
        >
          <Star
            key={num}
            className={styles.wrapper__star}
            fill={rating >= num ? '#ff7f23' : '#eee'}
          />
        </button>
      ))}
    </div>
  );
}

function EnterStarRateContainer({ rating }: { rating: number }) {
  const {
    handleMouseLeave, handleClick,
  } = useContext(StarRateContext);
  const [starNum, setStarNum] = useState(rating);

  return (
    <div
      className={styles.starRateContainer}
      onMouseLeave={() => {
        handleMouseLeave();
        setStarNum(0);
      }}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
          onMouseEnter={() => setStarNum(num)}
          onClick={() => {
            handleClick(num);
          }}
        >
          <Star
            key={num}
            className={styles.wrapper__star}
            fill={starNum >= num ? '#ff7f23' : '#eee'}
          />
        </button>
      ))}
    </div>
  );
}

export default function StarRating({ onClick }: Props) {
  const [rating, setRating] = useState(0);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const value = useMemo(() => ({
    handleMouseEnter: () => setIsMouseEnter(true),
    handleMouseLeave: () => setIsMouseEnter(false),
    handleClick: (num: number) => {
      setRating(num);
      onClick?.();
    },
  }), [onClick]);

  return (
    <StarRateContext.Provider value={value}>
      {isMouseEnter ? (
        <EnterStarRateContainer rating={rating} />
      ) : (
        <LeaveStarRateContainer rating={rating} />
      )}
    </StarRateContext.Provider>
  );
}

import { ReactComponent as Star } from 'assets/svg/star.svg';
import {
  createContext, useMemo, useState,
} from 'react';
import useContext from '../../utils/hooks/useContext';
import styles from './StarRating.module.scss';

interface StarRateContextType {
  enter: () => void;
  leave: () => void;
  click: (num: number) => void;
  setActive?: () => void;
}
interface Props {
  setActive: () => void;
}

export const StarRateContext = createContext<StarRateContextType | null>(null);

function LeaveStarRateContainer({ rating }: { rating: number }) {
  const { enter } = useContext(StarRateContext);
  return (
    <div
      className={styles.starRateContainer}
      onMouseEnter={enter}
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
    leave, click, setActive,
  } = useContext(StarRateContext);
  const [starNum, setStarNum] = useState(rating);

  return (
    <div
      className={styles.starRateContainer}
      onMouseLeave={() => {
        leave();
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
            click(num);
            setActive?.();
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

export default function StarRating({ setActive }: Props) {
  const [rating, setRating] = useState(0);
  const [mouseEnter, setMouseEnter] = useState(false);

  const value = useMemo(() => ({
    enter: () => setMouseEnter(true),
    leave: () => setMouseEnter(false),
    click: (num: number) => setRating(num),
    setActive: () => setActive?.(),
  }), [setActive]);

  return (
    <StarRateContext.Provider value={value}>
      {mouseEnter === true ? (
        <EnterStarRateContainer rating={rating} />
      ) : (
        <LeaveStarRateContainer rating={rating} />
      )}
    </StarRateContext.Provider>
  );
}

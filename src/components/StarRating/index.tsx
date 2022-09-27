import { ReactComponent as Star } from 'assets/svg/star.svg';
import {
  createContext, useMemo, useState,
} from 'react';
import useContext from '../../utils/hooks/useContext';
import styles from './StarRating.module.scss';

interface StarRatingContextType {
  handleEnter: () => void;
  handleClick: (num: number) => void;
  handleLeave: () => void;
  setActive?: () => void;
}
interface Props {
  setActive: () => void;
}

export const StarRatingContext = createContext<StarRatingContextType | null>(null);

// 고정된 별점을 보여주는 컴포넌트
function FixStarRatingContainer({ rating }: { rating: number }) {
  const { handleEnter } = useContext(StarRatingContext);
  return (
    <div
      className={styles.starRateContainer}
      onMouseEnter={handleEnter}
    >
      { [1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
        >
          <Star
            key={num + 1}
            className={styles.wrapper__star}
            fill={rating >= num ? '#ff7f23' : '#eee'}
          />
        </button>
      ))}
    </div>
  );
}

// 유동적으로 별점을 보여주는 컴포넌트
function UnFixStarRatingContainer({ rating }: { rating: number }) {
  const {
    handleLeave, handleClick, setActive,
  } = useContext(StarRatingContext);
  const [starIndex, setStarIndex] = useState(rating);

  return (
    <div
      className={styles.starRateContainer}
      onMouseLeave={() => {
        handleLeave();
        setStarIndex(0);
      }}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
          onMouseEnter={() => setStarIndex(num)}
          onClick={() => {
            handleClick(num);
            setActive?.();
          }}
        >
          <Star
            key={num}
            className={styles.wrapper__star}
            fill={starIndex >= num ? '#ff7f23' : '#eee'}
          />
        </button>
      ))}
    </div>
  );
}

export default function StarRating({ setActive }: Props) {
  const [rating, setRating] = useState(0);
  const [fixed, setFixed] = useState<boolean>(false);

  const value = useMemo(() => ({
    handleEnter: () => setFixed(false),
    handleLeave: () => setFixed(true),
    handleClick: (num: number) => {
      setRating(num);
      setFixed(true);
    },
    setActive: () => setActive?.(),
  }), [setActive]);

  return (
    <StarRatingContext.Provider value={value}>
      {fixed === true ? (
        <FixStarRatingContainer rating={rating} />
      ) : (
        <UnFixStarRatingContainer rating={rating} />
      )}
    </StarRatingContext.Provider>
  );
}

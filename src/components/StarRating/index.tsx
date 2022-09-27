import { ReactComponent as Star } from 'assets/svg/star.svg';
import {
  createContext, useMemo, useState,
} from 'react';
import useStarRatingContext, { ContextType } from './hooks/useStarRatingContext';
import styles from './StarRating.module.scss';

interface Props {
  onClick: () => void;
}

export const StarRatingContext = createContext<ContextType | null>(null);

// StarContainer밖에 커서가 있을 때
function FixStarRatingContainer({ rating }: { rating: number }) {
  const { handleEnter } = useStarRatingContext({ StarRatingContext });
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

// StarContainer안으로 커서가 들어왔을 때
function UnFixStarRatingContainer({ rating }: { rating: number }) {
  const { handleLeave, handleClick, onClick } = useStarRatingContext({ StarRatingContext });
  const [star, setStar] = useState(rating);

  return (
    <div
      className={styles.starRateContainer}
      onMouseLeave={() => {
        handleLeave();
        setStar(0);
      }}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
          onMouseEnter={() => setStar(num)}
          onClick={() => {
            handleClick(num);
            onClick?.();
          }}
        >
          <Star
            key={num}
            className={styles.wrapper__star}
            fill={star >= num ? '#ff7f23' : '#eee'}
          />
        </button>
      ))}
    </div>
  );
}

export default function StarRating({ onClick }: Props) {
  const [rating, setRating] = useState(0);
  const [fixed, setFixed] = useState<boolean>(false);

  const value = useMemo(() => ({
    handleEnter: () => setFixed(false),
    handleLeave: () => setFixed(true),
    handleClick: (num: number) => {
      setRating(num);
      setFixed(true);
    },
    onClick: () => onClick?.(),
  }), [onClick]);

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

import { useState } from 'react';

import { ReactComponent as Star } from 'assets/svg/post/star.svg';
import StarRateContext from 'components/StarRating/StarRateContext';
import useContext from 'utils/hooks/useWrappingContext';

import styles from './StarRating.module.scss';

export default function EnterStarRateContainer({ rating }: { rating: number }) {
  const { handleMouseLeave, handleClick } = useContext(StarRateContext);
  const [starQuantity, setStarQuantity] = useState(rating);

  return (
    <div
      className={styles['star-rate-container']}
      onMouseLeave={() => {
        handleMouseLeave();
        setStarQuantity(0);
      }}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
          onMouseEnter={() => setStarQuantity(num)}
          onClick={() => handleClick(num)}
          aria-label="별점 주기"
        >
          <Star
            key={num}
            className={styles.wrapper__star}
            fill={starQuantity >= num ? '#ff7f23' : '#eee'}
          />
        </button>
      ))}
    </div>
  );
}

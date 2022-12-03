import { ReactComponent as Star } from 'assets/svg/post/star.svg';
import useContext from 'utils/hooks/useWrappingContext';
import StarRateContext from './StarRateContext';
import styles from './StarRating.module.scss';

export default function LeaveStarRateContainer({ rating }: { rating: number }) {
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

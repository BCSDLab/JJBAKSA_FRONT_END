import { ReactComponent as Star } from 'assets/svg/star.svg';
import styles from './StarRating.module.scss';
import useRate, { Props } from './hooks/useRate';

function StarContainer({ onClick }: Props) {
  const {
    fixStarCount,
    countStarHover,
    starHoverLeave,
    fillStar,
    hover,
  } = useRate({ onClick });

  return (
    <div className={styles.starRateContainer}>
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
          onMouseEnter={() => countStarHover(num)}
          onMouseLeave={() => starHoverLeave(num)}
          onClick={() => fixStarCount(num)}
        >
          <Star
            fill={fillStar(num, hover === 0 ? 'leave' : 'enter')}
            key={num}
            className={styles.wrapper__star}
          />
        </button>
      ))}
    </div>
  );
}

export default StarContainer;

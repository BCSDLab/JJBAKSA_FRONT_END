import { ReactComponent as Star } from 'assets/svg/star.svg';
import styles from './StarRating.module.scss';
import useRate, { StarRatingProps } from './hooks/useRate';

function StarContainer({ rating }: StarRatingProps) {
  const {
    hover,
    click,
    fixStarCount,
    countStarHover,
    starHoverLeave,
  } = useRate({ rating });

  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((num) => (
        <Star
          fill={(hover >= num) || (click >= num) ? '#ff7f23' : '#eeeeee'}
          key={num}
          className={styles.container__star}
          onMouseEnter={() => countStarHover(num)}
          onMouseLeave={() => starHoverLeave(num)}
          onClick={() => fixStarCount(num)}
        />
      ))}
    </div>
  );
}

export default StarContainer;

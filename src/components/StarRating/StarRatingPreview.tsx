import { ReactComponent as Star } from 'assets/svg/post/star.svg';

import styles from './StarRating.module.scss';

interface Props {
  rate: number;
}

function StarRatingPreview({ rate }: Props) {
  return (
    <div className={styles['star-rate-container']}>
      {[1, 2, 3, 4, 5].map((num) => (
        <Star
          key={num}
          className={styles.wrapper__star}
          width={40}
          fill={rate >= num ? '#ff7f23' : '#eee'}
        />
      ))}
    </div>
  );
}

export default StarRatingPreview;

import { ReactComponent as Star } from 'assets/svg/star.svg';
import styles from './StarRating.module.scss';
import useStarIndex from './hooks/useStarIndex';
import useFillStar from './hooks/useFillStar';

interface Props {
  onClick: () => void;
}

function StarContainer({ onClick }: Props) {
  const {
    hoveredStarIndex,
    setHoveredStarIndex,
    clickedStarIndex,
    setClickedStarIndex,
  } = useStarIndex();
  const { fillStarOfIndex } = useFillStar({ hoveredStarIndex, clickedStarIndex });

  return (
    <div className={styles.starRateContainer}>
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          type="button"
          className={styles.wrapper}
          onMouseEnter={() => setHoveredStarIndex(num)}
          onMouseLeave={() => setHoveredStarIndex(0)}
          onClick={() => {
            setClickedStarIndex(num);
            onClick?.();
          }}
        >
          <Star
            key={num}
            className={styles.wrapper__star}
            fill={fillStarOfIndex(num, hoveredStarIndex === 0 ? 'leave' : 'enter')}
          />
        </button>
      ))}
    </div>
  );
}

export default StarContainer;

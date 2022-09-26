import { ReactComponent as Star } from 'assets/svg/star.svg';
import { useState } from 'react';
import styles from './StarContainer.module.scss';

interface StarContainerProps {
  rating: () => void;
}

function StarContainer({ rating }: StarContainerProps) {
  const [hover, setHover] = useState(0);
  const [click, setClick] = useState(0);
  const clickHandler = (n: number) => {
    setClick(n);
    rating();
  };

  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((num) => (
        <Star
          fill={(hover >= num) || (click >= num) ? '#ff7f23' : '#eeeeee'}
          key={num}
          className={styles.container__star}
          onMouseEnter={() => setHover(num)}
          onMouseLeave={() => setHover(0)}
          onClick={() => clickHandler(num)}
        />
      ))}
    </div>
  );
}

export default StarContainer;

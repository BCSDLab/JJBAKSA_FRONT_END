import { ReactComponent as Star } from 'assets/svg/star.svg';
import { useState } from 'react';
import styles from './StarContainer.module.scss';

type StarContainerProps = {
  checkRating: () => void;
};

function StarContainer({ checkRating }: StarContainerProps) {
  const [hovered, setHovered] = useState<number>(0);
  const [clicked, setClicked] = useState<number>(0);
  const clickedHandler = (n: number) => {
    setClicked(n);
    checkRating();
  };

  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((num) => (
        <Star
          fill={(hovered >= num) || (clicked >= num) ? '#ff7f23' : '#eeeeee'}
          key={num}
          className={styles.container__star}
          onMouseEnter={() => setHovered(num)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => clickedHandler(num)}
        />
      ))}
    </div>
  );
}

export default StarContainer;

import { ReactComponent as NextIcon } from 'assets/svg/shop/next-arrow.svg';
import { ReactComponent as PrevIcon } from 'assets/svg/shop/prev-arrow.svg';
import useCounter from 'utils/hooks/useCounter';

import styles from './ImageCarousel.module.scss';

interface Props {
  imageUrls: string[];
}

function ImageCarousel({ imageUrls }: Props) {
  const { count: currentIndex, increment, decrement } = useCounter(0);

  const next = () => {
    if (currentIndex === imageUrls.length - 3) return;

    increment();
  };

  const prev = () => {
    if (currentIndex === 0) return;

    decrement();
  };

  return (
    <div className={styles.container}>
      <ul
        className={`${styles['image-carousel']}`}
        style={{ transform: `translateX(-${360 * currentIndex}px)` }}
      >
        {imageUrls.map((url, index) => (
          <li key={url}>
            <img src={url} alt={`${index}번 음식점`} />
          </li>
        ))}
      </ul>

      <div className={styles['back-drop__left']}>
        <button type="button" onClick={prev} aria-label="이전 이미지">
          <PrevIcon />
        </button>
      </div>
      <div className={styles['back-drop__right']}>
        <button type="button" onClick={next} aria-label="다음 이미지">
          <NextIcon />
        </button>
      </div>
    </div>
  );
}

export default ImageCarousel;

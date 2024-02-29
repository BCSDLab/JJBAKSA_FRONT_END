import { createPortal } from 'react-dom';

import defaultImage from 'assets/svg/common/403-image.svg';
import { ReactComponent as CloseIcon } from 'assets/svg/shop/close.svg';
import { ReactComponent as NextIcon } from 'assets/svg/shop/next-arrow.svg';
import { ReactComponent as PrevIcon } from 'assets/svg/shop/prev-arrow.svg';
import useCounter from 'utils/hooks/useCounter';
import cn from 'utils/ts/classNames';

import styles from './ImageModal.module.scss';

interface Props {
  toggle: () => void
  photos: string[];
}

function ImageModal({ toggle, photos }: Props) {
  const { count: currentIndex, increment, decrement } = useCounter(0);

  const next = () => {
    if (currentIndex >= photos.length - 1) {
      return;
    }
    increment();
  };

  const prev = () => {
    if (currentIndex === 0) {
      return;
    }

    decrement();
  };
  return (
    createPortal(
      <div className={styles.background}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles['close-button']}
            onClick={toggle}
            aria-label="이미지 모달 닫기"
          >
            <CloseIcon width="20" height="20" />
          </button>
          <div className={styles.photos}>
            <ul
              className={styles['image-carousel']}
              style={{ transform: `translateX(-${100 * currentIndex}%)` }}
            >
              {photos.map((url, index) => (
                <li key={url}>
                  <picture>
                    <source srcSet={defaultImage} />
                    <img src={url} alt={`${index}번 음식점`} />
                  </picture>
                </li>
              ))}
            </ul>
            <ul
              className={styles['small-carousel']}
            >
              {photos.map((url, index) => (
                <li
                  key={url}
                  className={cn({
                    [styles['small-carousel__list']]: true,
                    [styles['small-carousel__list--active']]: index === currentIndex,
                  })}
                >
                  <picture>
                    <source srcSet={defaultImage} />
                    <img src={url} alt={`${index}번 음식점`} />
                  </picture>
                </li>
              ))}
            </ul>
            <div className={styles['back-drop__left']}>
              <button type="button" onClick={prev} aria-label="이전 이미지">
                <PrevIcon width="50" height="50" />
              </button>
            </div>
            <div className={styles['back-drop__right']}>
              <button type="button" onClick={next} aria-label="다음 이미지">
                <NextIcon width="50" height="50" />
              </button>
            </div>
          </div>

        </div>
      </div>,
      document.body,
    )
  );
}

export default ImageModal;

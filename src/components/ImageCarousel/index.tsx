import defaultImage from 'assets/svg/common/403-image.svg';
import { ReactComponent as NextIcon } from 'assets/svg/shop/next-arrow.svg';
import { ReactComponent as NotFoundImageIcon } from 'assets/svg/common/not-found.svg';
import { ReactComponent as PrevIcon } from 'assets/svg/shop/prev-arrow.svg';
import useCounter from 'utils/hooks/useCounter';

import styles from './ImageCarousel.module.scss';

interface Props {
  pathname: string;
  imageUrls: string[] | null | undefined;
}

function ImageCarousel({ pathname, imageUrls }: Props) {
  const { count: currentIndex, increment, decrement } = useCounter(0);
  const imageCheck = pathname === 'shop' ? 3 : 1;
  const transfromValue = imageCheck === 3 ? `translateX(-${360 * currentIndex}px)` : `translateX(-${100 * currentIndex}%)`;

  const next = () => {
    if (imageUrls && currentIndex >= imageUrls.length - imageCheck) {
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
    <div className={styles[`${pathname}__container`]}>
      {imageUrls === null || imageUrls === undefined ? (
        <div className={styles[`${pathname}__empty-image`]}>
          <NotFoundImageIcon />
          <div>등록된 사진이 없습니다.</div>
        </div>
      ) : (
        <>
          <ul
            className={styles[`${pathname}__image-carousel`]}
            style={{ transform: transfromValue }}
          >
            {imageUrls.map((url, index) => (
              <li key={url}>
                <picture>
                  <source srcSet={defaultImage} />
                  <img src={url} alt={`${index}번 음식점`} />
                </picture>
              </li>
            ))}
          </ul>
          <div className={styles[`${pathname}__back-drop__left`]}>
            <button type="button" onClick={prev} aria-label="이전 이미지">
              <PrevIcon />
            </button>
          </div>
          <div className={styles[`${pathname}__back-drop__right`]}>
            <button type="button" onClick={next} aria-label="다음 이미지">
              <NextIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;

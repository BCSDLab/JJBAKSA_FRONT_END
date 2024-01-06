import { ReactComponent as NextIcon } from 'assets/svg/shop/next-arrow.svg';
import { ReactComponent as NotFoundImageIcon } from 'assets/svg/shop/not-found.svg';
import { ReactComponent as PrevIcon } from 'assets/svg/shop/prev-arrow.svg';
import useCounter from 'utils/hooks/useCounter';
import makeToast from 'utils/ts/makeToast';

import styles from './ImageCarousel.module.scss';

interface Props {
  pathname: string;
  imageUrls: string[] | null | undefined;
}

function ImageCarousel({ pathname, imageUrls }: Props) {
  const { count: currentIndex, increment, decrement } = useCounter(0);

  const next = () => {
    const imageCheck = pathname === 'shop' ? 3 : 1;
    if (imageUrls && currentIndex >= imageUrls.length - imageCheck) {
      makeToast('info', '마지막 이미지입니다.');
      return;
    }
    increment();
  };

  const prev = () => {
    if (currentIndex === 0) {
      makeToast('info', '첫 이미지입니다.');
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
            style={{ transform: `translateX(-${100 * currentIndex}%)` }}
          >
            {imageUrls.map((url, index) => (
              <li key={url}>
                <img src={url} alt={`${index}번 음식점`} />
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

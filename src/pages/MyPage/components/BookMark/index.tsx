import defaultImage from 'assets/svg/common/favicon.svg';
import notExist from 'assets/svg/mypage/not-exist.svg';
import filledStar from 'assets/svg/mypage/star-filled.svg';
import { ReactComponent as NotFoundImageIcon } from 'assets/svg/shop/not-found.svg';
import LoadingSpinner from 'components/common/LoadingSpinner';
import useObserver from 'pages/MyPage/hooks/useObeserver';
import useScraps from 'pages/MyPage/hooks/useScraps';

import styles from './BookMark.module.scss';

export default function BookMark() {
  const {
    scraps, isLoading, fetchNextPage, total,
  } = useScraps();
  const { target: bottom } = useObserver(fetchNextPage);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner size={100} />
      </div>
    );
  }

  return (
    <div className={styles.bookmarks}>
      {!isLoading && scraps?.length !== 0 ? (
        <>
          <span className={styles.bookmarks__total}>{`총 ${total}개의 음식점`}</span>
          {scraps?.map((scrap) => (
            <div className={styles.bookmark} key={scrap.createdAt}>
              <div className={styles.bookmark__detail}>
                <span className={styles['bookmark__detail--name']}>{scrap.name}</span>
                <span className={styles['bookmark__detail--type']}>{scrap.category}</span>
              </div>
              <div className={styles['bookmark__star-rate']}>
                <img src={filledStar} alt="satr-rate" className={styles['bookmark__star-rate--image']} />
                <span className={styles['bookmark__star-rate--rate']}>
                  {scrap.rate.ratingCount === 0 ? '0'
                    : (scrap.rate.totalRating / scrap.rate.ratingCount).toFixed(1)}
                </span>
              </div>
              <div className={styles['bookmark__store-image']}>
                {scrap.photo ? (
                  <picture className={styles['bookmark__store-picture']}>
                    <source srcSet={defaultImage} />
                    <img
                      alt="imageAlt"
                      src={scrap.photo}
                      className={styles['bookmark__store-image--image']}
                    />
                  </picture>
                ) : (
                  <div className={styles['bookmark__store-image--empty']}>
                    <NotFoundImageIcon />
                    <div>등록된 사진이 없어요!</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className={styles['not-exist']}>
          <span className={styles['not-exist__phrase']}>
            <p>등록된 북마크가 없어요.</p>
            <p>새로운 음식점을 저장해 보세요!</p>
          </span>
          <img src={notExist} alt="not-exist" className={styles['not-exist__image']} />
        </div>
      )}
      <div ref={bottom} />
    </div>
  );
}

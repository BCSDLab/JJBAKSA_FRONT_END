import filledStar from 'assets/svg/mypage/star-filled.svg';
import defaultImage from 'assets/images/search/default-image.png';
import useScraps from 'pages/MyPage/hooks/useScraps';
import useObserver from 'pages/MyPage/hooks/useObeserver';
import notExist from 'assets/svg/mypage/not-exist.svg';
import styles from './BookMark.module.scss';

export default function BookMark() {
  const {
    scraps, isLoading, fetchNextPage, total,
  } = useScraps();
  const { target: bottom } = useObserver(fetchNextPage);
  return (
    <div className={styles.bookmarks}>
      {!isLoading && scraps && (
        <>
          <span className={styles.bookmarks__total}>{`총 ${total}개의 음식점`}</span>
          {scraps.map((scrap) => (
            <div className={styles.bookmark} key={scrap.scrapId}>
              <div className={styles.bookmark__detail}>
                <span className={styles['bookmark__detail--name']}>{scrap.name}</span>
                <span className={styles['bookmark__detail--type']}>{scrap.category}</span>
              </div>
              <div className={styles['bookmark__star-rate']}>
                <img src={filledStar} alt="satr-rate" className={styles['bookmark__star-rate--image']} />
                <span className={styles['bookmark__star-rate--rate']}>{parseFloat((scrap.totalRating / scrap.ratingCount).toString()).toFixed(1)}</span>
              </div>
              <div className={styles['bookmark__store-image']}>
                <img className={styles['bookmark__store-image--crop']} src={scrap.photo ? scrap.photo : defaultImage} alt="store" />
              </div>
            </div>
          ))}
        </>
      )}
      {!isLoading && !scraps
              && (
              <div className={styles['not-exist']}>
                <span className={styles['not-exist__phrase']}>
                  <p>둥록된 북마크가 없어요.</p>
                  <p>새로운 음식점을 저장해 보세요!</p>
                </span>
                <img src={notExist} alt="not-exist" className={styles['not-exist__image']} />
              </div>
              )}
      <div ref={bottom} />
    </div>
  );
}

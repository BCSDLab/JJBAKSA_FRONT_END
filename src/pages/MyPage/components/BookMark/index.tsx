import filledStar from 'assets/svg/mypage/star-filled.svg';
import defaultImage from 'assets/images/search/default-image.png';
import notExist from 'assets/svg/mypage/not-exist.svg';
import DUMMY from '../MyPost/dummy';
import styles from './BookMark.module.scss';

export default function BookMark() {
  return (
    <div className={styles.bookmarks}>
      {DUMMY.length !== 0 ? (
        <>
          <span className={styles.bookmarks__total}>{`총 ${DUMMY.length}개의 음식점`}</span>
          {DUMMY.map(() => (
            <div className={styles.bookmark}>
              <div className={styles.bookmark__detail}>
                <span className={styles['bookmark__detail--name']}>국밥 공을기</span>
                <span className={styles['bookmark__detail--type']}>중식당</span>
              </div>
              <div className={styles['bookmark__star-rate']}>
                <img src={filledStar} alt="satr-rate" className={styles['bookmark__star-rate--image']} />
                <span className={styles['bookmark__star-rate--rate']}>4.0</span>
              </div>
              <div className={styles['bookmark__store-image']}>
                <img className={styles['bookmark__store-image--crop']} src={defaultImage} alt="store" />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className={styles['not-exist']}>
          <span className={styles['not-exist__phrase']}>
            <p>둥록된 북마크가 없어요.</p>
            <p>새로운 음식점을 저장해 보세요!</p>
          </span>
          <img src={notExist} alt="not-exist" className={styles['not-exist__image']} />
        </div>
      )}

    </div>
  );
}

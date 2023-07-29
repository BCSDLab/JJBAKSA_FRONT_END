import filledStar from 'assets/svg/mypage/star-filled.svg';
import defaultImage from 'assets/images/search/default-image.png';
import DUMMY from '../MyPost/dummy';
import styles from './BookMark.module.scss';

export default function BookMark() {
  return (
    <div className={styles.bookmarks}>
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
    </div>
  );
}

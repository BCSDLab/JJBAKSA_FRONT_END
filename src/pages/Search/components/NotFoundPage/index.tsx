import img from 'assets/images/search/not-found-img.jpeg';

import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.info__title}>
          해당 검색어와 관련된
          <br />
          음식점/게시물을 찾을 수 없습니다.
        </div>
        <div className={styles.info__subtitle}>
          다시 한 번 검색해 보세요!
        </div>
        <img
          className={styles.info__image}
          src={img}
          alt="not-found"
        />
      </div>
    </div>
  );
}

import img from 'assets/images/search/not-found-img.jpeg';

import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <section>
      <div className={styles['not-found-page__container']}>
        <div className={styles['not-found-page__container__title']}>
          해당 검색어와 관련된
          {' '}
          <br />
          {' '}
          음식점/게시물을 찾을 수 없습니다.
        </div>
        <div className={styles['not-found-page__container__description']}>
          <div className="not-found-page__container__description__text">다시 한 번 검색해 보세요!</div>
        </div>
        <img className={styles['not-found-page__container__image']} src={img} alt="not-found" />
      </div>
    </section>

  );
}

import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import defaultImage from 'assets/images/search/default-image.png';

interface Props {
  shop: {
    address: string,
    placeName: string,
    shopId: number,
  },
}

export default function SearchItemPC({ shop }: Props) {
  const { placeName, address } = shop;
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img className={styles.image__main} alt="가게 이미지 없음" src={defaultImage} />
        <div className={styles.image__other}>
          <img className={styles['image__other--second']} alt="가게 이미지 없음" src={defaultImage} />
          <img className={styles['image__other--third']} alt="가게 이미지 없음" src={defaultImage} />
          <img className={styles['image__other--fourth']} alt="가게 이미지 없음" src={defaultImage} />
        </div>
      </div>
      <div className={styles.item__content}>
        <section className={styles.item__name}>
          <h1 className={styles.item__title}>{placeName}</h1>
          <h2 className={styles.item__address}>{address}</h2>
        </section>
        <section className={styles.item__info}>
          <div>
            <div className={styles.item__status}>
              <span className={styles['item__status--open']}>영업 중 </span>
              <span className={styles.item__closing}>- 21:00에 영업 종료</span>
            </div>
            <div className={styles.item__distance}>내 위치로부터 23m</div>
            <div className={styles.item__phone}>
              전화하기
              {'    '}
              010-0000-0000
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}

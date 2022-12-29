import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import { ReactComponent as MapIcon } from 'assets/svg/search/map.svg';
import defaultImage from 'assets/images/search/default-image.png';

interface Props {
  shop: {
    address: string,
    placeName: string,
    shopId: number,
  },
}

export default function SearchItem({ shop }: Props) {
  const { placeName, address } = shop;
  return (
    <div className={styles.item}>
      <img alt="가게 이미지 없음" src={defaultImage} />
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
          </div>
          <MapIcon className={styles.item__map} />
        </section>
      </div>

    </div>
  );
}

import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import { ReactComponent as MapIcon } from 'assets/svg/search/map.svg';
import DefaultImage from 'assets/images/search/default-image.png';

interface Props {
  shop: {
    address: string,
    placeName: string,
    shopId: number
  }
}

export default function SearchItem({ shop }: Props) {
  const { placeName, address } = shop;
  return (
    <div className={styles['search-item']}>

      <img alt="가게 이미지 없음" src={DefaultImage} />
      <div className={styles['search-item__content']}>
        <section className={styles['search-item__info']}>
          <h1 className={styles['search-item__info--title']}>{placeName}</h1>
          <h2 className={styles['search-item__info--address']}>{address}</h2>
        </section>
        <section className={styles['search-item__status']}>
          <div className={styles['search-item__status-wrapper']}>
            <div>
              <div className={styles['search-item__status--business']}>
                <span className={styles['search-item__status--in-business']}>영업 중</span>
                {' '}
                - 21:00에 영업 종료
              </div>
              <div className={styles['search-item__status--distance']}>내 위치로부터 23m</div>
            </div>
            <MapIcon className={styles['search-item__status--map']} />
          </div>
        </section>
      </div>

    </div>
  );
}

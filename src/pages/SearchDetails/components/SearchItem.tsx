import { useNavigate } from 'react-router-dom';

import { Shop } from 'api/shop/entity';
import { ReactComponent as PhoneImg } from 'assets/svg/search/phone.svg';
import { getMockItem } from 'pages/SearchDetails/static/mockup';

import styles from '../SearchDetails.module.scss';

interface Props {
  shop: Shop;
  pathname: string;
}
export default function SearchItem({ shop, pathname }: Props) {
  const {
    name, formattedAddress, photoToken, placeId, dist, openNow, category,
  } = shop;

  const {
    imageAlt, defaultImage, phoneNumber,
  } = getMockItem();

  const navigate = useNavigate();
  const distInKm = (dist / 1000).toFixed(1);
  const onClick = () => {
    const newPath = pathname.includes('/post') ? `/post/${name}` : `/shop/${name}`;
    navigate(newPath, { state: { placeId } });
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={styles.item}
    >
      <div className={styles.item__content}>
        <section className={styles.item__name}>
          <div className={styles.item__header}>
            <h1 className={styles['item__header--title']}>{name}</h1>
            <h2 className={styles['item__header--category']}>{category}</h2>
          </div>
          <div className={styles.item__header}>
            <h2 className={styles['item__header--address']}>{formattedAddress}</h2>
            <h2 className={styles['item__header--dist']}>{`${distInKm}Km`}</h2>
          </div>
        </section>
        <section className={styles.item__info}>
          <div>
            <div className={styles.item__status}>
              <span className={styles['item__status--open']}>
                {openNow ? '영업중' : '영업 종료'}
              </span>
            </div>
            <a
              onClick={(e) => e.stopPropagation()}
              href={`tel:${phoneNumber}`}
              className={styles.item__phone}
            >
              <div className={styles['item__phone--image']}>
                <PhoneImg />
              </div>
              <div className={styles['item__phone--text']}>
                {phoneNumber}
              </div>
            </a>
          </div>
        </section>
      </div>
      <div className={styles.image}>
        <img className={styles.image__item} alt={imageAlt} src={photoToken ?? defaultImage} />
      </div>
    </button>
  );
}

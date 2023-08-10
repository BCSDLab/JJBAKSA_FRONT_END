import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import { Link } from 'react-router-dom';
import { Shop } from 'api/search/entity';
import { getMockItem, SHOPS } from '../static/mockup';

interface Props {
  shop: Shop;
}

export default function SearchItemPC({ shop }: Props) {
  const { name, formattedAddress, photoToken } = shop;
  const {
    imageAlt, defaultImage, phoneNumber, image,
  } = getMockItem();

  return (
    <Link to="/" className={styles.item}>
      <div className={styles.image}>
        <img className={styles.image__main} alt={imageAlt} src={photoToken ?? defaultImage} />
        <div className={styles.image__other}>
          <img className={styles['image__other--second']} alt={imageAlt} src={image ?? defaultImage} />
          <img className={styles['image__other--third']} alt={imageAlt} src={image ?? defaultImage} />
          <img className={styles['image__other--fourth']} alt={imageAlt} src={image ?? defaultImage} />
        </div>
      </div>
      <div className={styles.item__content}>
        <section className={styles.item__name}>
          <h1 className={styles.item__title}>{name}</h1>
          <h2 className={styles.item__address}>{formattedAddress}</h2>
        </section>
        <section className={styles.item__info}>
          <div>
            <div className={styles.item__status}>
              <span className={styles['item__status--open']}>
                {SHOPS.status}
              </span>
              <span className={styles.item__closing}>{SHOPS.closing}</span>
            </div>
            <div className={styles.item__distance}>{SHOPS.distance}</div>
            <a
              onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                event.stopPropagation();
              }}
              href={`tel:${phoneNumber}`}
              className={styles.item__phone}
            >
              {`전화하기    ${phoneNumber}`}
            </a>
          </div>
        </section>
      </div>
    </Link>
  );
}

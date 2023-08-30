import styles from 'pages/SearchDetails/SearchDetails.module.scss';
import { useNavigate } from 'react-router-dom';
import { Shop } from 'api/search/entity';
import { getMockItem } from '../static/mockup';

interface Props {
  shop: Shop;
}

export default function SearchItem({ shop }: Props) {
  const {
    name, formattedAddress, photoToken, placeId, dist, openNow,
  } = shop;
  const {
    imageAlt, defaultImage, phoneNumber, image,
  } = getMockItem();
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/post/${name}`, { state: { placeId } })} type="button" className={styles.item}>
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
                {openNow ? '영업중' : '영업 종료'}
              </span>
              {/* <span className={styles.item__closing}></span> */}
            </div>
            <div className={styles.item__distance}>
              {`내 위치로부터 ${dist.toFixed(2)}m`}
            </div>
            <a
              onClick={(e) => e.stopPropagation()}
              href={`tel:${phoneNumber}`}
              className={styles.item__phone}
            >
              {`전화하기    ${phoneNumber}`}
            </a>
          </div>
        </section>
      </div>
    </button>
  );
}

import { useLocation, useNavigate } from 'react-router-dom';

import { Shop } from 'api/shop/entity';
import defaultImage from 'assets/svg/common/favicon.svg';
import { ReactComponent as PhoneIcon } from 'assets/svg/search/phone.svg';
import { ReactComponent as Star } from 'assets/svg/search/star.svg';
import { Card } from 'pages/Search/static/entity';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './SearchItem.module.scss';

interface Props {
  shop: Shop;
  addCard: (card: Card) => void;
}

export default function SearchItem({ shop, addCard }: Props) {
  const {
    name, formattedAddress, photoToken, placeId, dist, openNow, category,
  } = shop;

  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMediaQuery();
  const distInKm = (dist / 1000).toFixed(1);

  const handleClick = () => {
    const card: Card = {
      category, name, photoToken, placeId,
    };

    addCard(card);

    const newPath = location.pathname.includes('/shop') ? `/shop/${placeId}` : `/post/${placeId}`;
    navigate(newPath);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.box}
        type="button"
        onClick={handleClick}
      >
        <div className={`${styles.box__info} ${styles.info}`}>
          <div className={`${styles.info__shop} ${styles.shop}`}>
            <div className={styles.shop__name}>{name}</div>
            <div className={styles.shop__category}>{category}</div>
          </div>

          <div className={`${styles.info__location} ${styles.location}`}>
            <div className={styles.location__address}>{formattedAddress.slice(4)}</div>
            |
            <div className={styles.location__distance}>{`${distInKm}Km` || '정보 없음'}</div>
          </div>

          <div className={`${styles.info__state} ${styles.state}`}>
            {isMobile ? (
              <>
                <Star />
                <div className={styles.state__time}>0.0</div>
                |
                <div className={styles.state__open}>{openNow ? '영업중' : '영업 종료'}</div>
              </>
            ) : (
              <>
                <div className={styles.state__open}>{openNow ? '영업중' : '영업 종료'}</div>
                |
                <div className={styles.state__time}>Operating Time</div>
              </>
            )}
          </div>

          {!isMobile && (
            <div className={`${styles.info__call} ${styles.call}`}>
              <PhoneIcon className={styles.call__icon} />
              <div className={styles.call__number}>Phone Number</div>
            </div>
          )}
        </div>
        <div className={`${styles.box__pictures} ${styles.pictures}`}>
          <picture className={styles.pictures__picture}>
            <img className={styles.pictures__image} alt="가게 이미지" src={photoToken ?? defaultImage} />
          </picture>
          {/* <picture className={styles.pictures__picture}>
            <source srcSet={defaultImage} />
            <img className={styles.pictures__image} alt="가게 이미지" />
          </picture>
          <picture className={styles.pictures__picture}>
            <source srcSet={defaultImage} />
            <img className={styles.pictures__image} alt="가게 이미지" />
          </picture> */}
        </div>
        {/* {isMobile && (
          <div className={`${styles.box__review} ${styles.review}`}>
            {review ? `${$reviewApi.length}개의 리뷰` : '리뷰 없음'}
          </div>
        )} */}
      </button>
    </div>
  );
}

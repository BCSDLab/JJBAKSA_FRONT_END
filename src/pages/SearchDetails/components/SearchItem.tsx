import { useLocation, useNavigate } from 'react-router-dom';

import { Shop } from 'api/shop/entity';
import defaultImage from 'assets/svg/common/favicon.svg';
import { ReactComponent as NotFoundImageIcon } from 'assets/svg/shop/not-found.svg';
import { Card } from 'pages/Search/static/entity';

import styles from '../SearchDetails.module.scss';

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
  const distInKm = (dist / 1000).toFixed(1);

  const handleClick = () => {
    const card: Card = {
      category, name, photoToken, placeId,
    };

    addCard(card);

    const newPath = location.pathname.includes('/post') ? `/post/${placeId}` : `/shop/${placeId}`;
    navigate(newPath);
  };

  return (
    <button
      className={styles.item}
      type="button"
      onClick={handleClick}
    >
      <div className={styles.info}>
        <div className={styles['info-data']}>
          <h2 className={styles['info-data__name']}>{name}</h2>
          <span>{category}</span>
        </div>
        <div className={styles['info-data']}>
          <span className={styles['info-data__formattedAddress']}>{formattedAddress.slice(4)}</span>|
          <span>{`${distInKm}Km` || '정보 없음'}</span>
        </div>
        <div className={styles['info-data--open']}>{openNow ? '영업중' : '영업 종료'}</div>
      </div>
      {photoToken ? (
        <picture className={styles.picture}>
          <source srcSet={defaultImage} />
          <img className={styles.image} alt="가게 이미지" src={photoToken} />
        </picture>
      ) : (
        <div className={styles['empty-image']}>
          <NotFoundImageIcon />
          <div>등록된 사진이 없어요!</div>
        </div>
      )}
    </button>
  );
}

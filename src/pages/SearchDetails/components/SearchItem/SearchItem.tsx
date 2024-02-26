import { useLocation, useNavigate } from 'react-router-dom';

import { ShopQueryResponse } from 'api/shop/entity';
import defaultImage from 'assets/svg/common/favicon.svg';
// import { ReactComponent as PhoneIcon } from 'assets/svg/search/phone.svg';
import { ReactComponent as Star } from 'assets/svg/search/star.svg';
import useShop from 'pages/Post/hooks/useShop';
import { Card } from 'pages/Search/static/entity';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';
import useShopRate from 'utils/hooks/useShopRate';

import styles from './SearchItem.module.scss';

interface Props {
  shop: ShopQueryResponse;
  addCard: (card: Card) => void;
}

export default function SearchItem({ shop, addCard }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useMediaQuery();

  const {
    name, formattedAddress, photoToken,
    placeId, dist, openNow, category,
  } = shop;

  const { todayPeriod } = useShop(placeId);
  const { rate } = useShopRate(placeId);
  const distInKm = (dist / 1000).toFixed(1);

  let newPath: string;

  if (location.pathname.includes('/shop')) {
    newPath = `/shop/${placeId}`;
  } else if (location.pathname.includes('/post')) {
    newPath = `/post/${placeId}`;
  } else {
    newPath = '/';
  }

  // api 없음 생략
  // const { reviewCount } = useReviewCount(placeId);
  // const safePhoneNumber = formattedPhoneNumber !== '' ? formattedPhoneNumber : '전화번호 정보 없음';

  const openTime = todayPeriod
    ? `${String(todayPeriod.openTime.hour).padStart(2, '0')}:${String(todayPeriod.openTime.minute).padStart(2, '0')}에 영업 시작`
    : '시작 정보 없음';
  const closeTime = todayPeriod
    ? `${String(todayPeriod.closeTime.hour).padStart(2, '0')}:${String(todayPeriod.closeTime.minute).padStart(2, '0')}에 영업 종료`
    : '종료 정보 없음';

  const handleClick = () => {
    const card: Card = {
      category, name, photoToken, placeId,
    };
    addCard(card);
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
            {isMobile && (
              <>
                <Star />
                <div className={styles.state__rating}>{rate}</div>
                |
              </>
            )}

            <div
              className={cn({
                [styles.state__operating]: true,
                [styles['state__operating--open']]: !!openNow,
              })}
            >
              {openNow ? '영업중' : '영업 종료'}
            </div>

            {!isMobile && (
              <>
                |
                <div className={styles.state__time}>
                  {openNow ? openTime : closeTime}
                </div>
              </>
            )}
          </div>
          {/* api 없음 생략 {!isMobile && (
            <div className={`${styles.info__call} ${styles.call}`}>
              <PhoneIcon className={styles.call__icon} />
              <div className={styles.call__number}>{safePhoneNumber}</div>
            </div>
          )} */}
        </div>

        <picture className={`${styles.box__images} ${styles.images}`}>
          {photoToken !== null && (
            <source
              srcSet={photoToken}
            />
          )}
          <img
            className={styles.images__image}
            alt="가게 이미지"
            src={defaultImage}
          />
        </picture>

        {/* api 없음 생략 {isMobile && (
          <div className={`${styles.box__review} ${styles.review}`}>
            {review ? `${$reviewApi.length}개의 리뷰` : '리뷰 없음'}
          </div>
        )} */}
      </button>
    </div>
  );
}

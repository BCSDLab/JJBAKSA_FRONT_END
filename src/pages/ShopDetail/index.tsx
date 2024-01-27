import { useParams } from 'react-router-dom';

import { Period } from 'api/shop/entity';
import LoadingSpinner from 'components/common/LoadingSpinner';
import ImageCarousel from 'components/ImageCarousel';
import StarRatingPreview from 'components/StarRating/StarRatingPreview';
import useShop from 'pages/Post/hooks/useShop';
import Map from 'pages/ShopDetail/components/Map/index';
import FriendReviewList from 'pages/ShopDetail/components/ReviewList/FriendReviewList';
import MyReviewList from 'pages/ShopDetail/components/ReviewList/MyReviewList';
import ScrapButton from 'pages/ShopDetail/components/ScrapButton/index';
import useBooleanState from 'utils/hooks/useBooleanState';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useRate from 'utils/hooks/useRate';
import useScrapId from 'utils/hooks/useScrapId';

import ImageModal from './components/ImageModal';
import styles from './ShopDetail.module.scss';

const formatPeriod = (period: Period) => {
  if (period) {
    const formatTime = (time: number) => time.toString().padStart(2, '0');
    const openTime = `${formatTime(period.openTime.hour)}:${formatTime(period.openTime.minute)}`;
    const closeTime = `${formatTime(period.closeTime.hour)}:${formatTime(period.closeTime.minute)}`;
    return `${openTime} - ${closeTime}`;
  }

  return '정보 없음';
};

function ShopDetail() {
  const params = useParams();
  const placeId = params.placeId as string;
  const [value, , , toggle] = useBooleanState(false);

  const { isMobile } = useMediaQuery();
  const { rate } = useRate(placeId);
  const { shop } = useShop(placeId);
  const { scrapId } = useScrapId(placeId);

  if (!shop) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner size={200} />
      </div>
    );
  }

  const {
    // category,
    coordinate,
    name,
    formattedAddress,
    formattedPhoneNumber,
    todayPeriod,
    photos,
  } = shop;

  return (
    <div className={styles.container}>
      {!isMobile
          ? (
            <button type="button" onClick={toggle} aria-labelledby="image-carousel-label">
              <ImageCarousel pathname="shop" imageUrls={photos} />
            </button>
          ) : <ImageCarousel pathname="pin" imageUrls={photos} />}
        {!isMobile && value && photos && photos.length > 0
        && <ImageModal toggle={toggle} photos={photos} />}
        <article className={styles['shop-detail']}>
      <article className={styles['shop-detail']}>
        <section className={styles['detail-main']}>
          <div>
            <div className={styles['detail-main__rating']}>
              <StarRatingPreview rate={rate} />
              <span>{rate}.0</span>
            </div>
            <div className={styles['detail-main__name']}>
              <h1>{name}</h1>
              {placeId && <ScrapButton placeId={placeId} initialScrapId={scrapId?.scrapId} />}
            </div>
          </div>
          <div>
            <div className={styles['detail-main__info-name']}>기본 정보</div>
            <div className={styles['detail-main__info']}>
              <span>영업시간</span>
              <div className={styles['line-divisor']} />
              <span>{formatPeriod(todayPeriod)}</span>
            </div>
            <div className={styles['detail-main__info']}>
              <span>전화번호</span>
              <div className={styles['line-divisor']} />
              <span>{formattedPhoneNumber ?? '정보 없음'}</span>
            </div>
            <div className={styles['detail-main__info']}>
              <span>주소</span>
              <div className={styles['line-divisor']} />
              <span>{formattedAddress}</span>
            </div>
          </div>
        </section>
        <FriendReviewList placeId={placeId} />
        {!isMobile ? (
          <>
            <Map
              formattedAddress={formattedAddress}
              latitude={coordinate.lat}
              longitude={coordinate.lng}
            />
            <MyReviewList placeId={placeId} />
          </>
        ) : (
          <>
            <MyReviewList placeId={placeId} />
            <Map
              formattedAddress={formattedAddress}
              latitude={coordinate.lat}
              longitude={coordinate.lng}
            />
          </>
        )}
      </article>
    </div>
  );
}

export default ShopDetail;

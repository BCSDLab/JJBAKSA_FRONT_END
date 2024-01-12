import { useLocation } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { fetchShop } from 'api/shop';
import { Period } from 'api/shop/entity';
import { ReactComponent as InfoIcon } from 'assets/svg/shop/info.svg';
import LoadingSpinner from 'components/common/LoadingSpinner';
import ImageCarousel from 'components/ImageCarousel';
// import StarRatingPreview from 'components/StarRating/StarRatingPreview';
import Map from 'pages/ShopDetail/components/Map/index';
import FriendReviewList from 'pages/ShopDetail/components/ReviewList/FriendReviewList';
import MyReviewList from 'pages/ShopDetail/components/ReviewList/MyReviewList';
import ScrapButton from 'pages/ShopDetail/components/ScrapButton/index';
import useScrapId from 'utils/hooks/useScrapId';

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
  const location = useLocation();

  const { data } = useQuery({
    queryKey: ['shopDetail', location.state.placeId],
    queryFn: () => fetchShop(location.state.placeId),
  });

  const { scrapId } = useScrapId(String(location.state.placeId));

  if (data && scrapId) {
    const {
      // category,
      placeId,
      coordinate,
      name,
      formattedAddress,
      formattedPhoneNumber,
      // totalRating,
      todayPeriod,
      photos,
    } = data.data;

    return (
      <div className={styles.container}>
        <ImageCarousel pathname="shop" imageUrls={photos} />
        <article className={styles['shop-detail']}>
          <section className={styles['detail-main']}>
            <div>
              <div className={styles['detail-main__rating']}>
                {/* totalRating 추가 필요 */}
                {/* <StarRatingPreview rate={totalRating} /> */}
                {/* totalRating이 -1인 경우는 아예 별점이 없는 경우를 의미합니다. */}
                {/* <span>{totalRating === -1 ? '0.0' : totalRating.toFixed(1)}</span> */}
              </div>
              <div className={styles['detail-main__name']}>
                <h1>{name}</h1>
                {placeId && <ScrapButton placeId={placeId} initialScrapId={scrapId.scrapId} />}
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
            <button className={styles['detail-main__report']} type="button" onClick={() => {}}>
              <InfoIcon />
              <div>틀린 정보 신고</div>
            </button>
          </section>

          <FriendReviewList placeId={placeId as string} />
          <Map
            formattedAddress={formattedAddress}
            latitude={coordinate.lat}
            longitude={coordinate.lng}
          />
          <MyReviewList placeId={placeId as string} />
        </article>
      </div>
    );
  }

  return (
    <div className={styles.loading}>
      <LoadingSpinner size={200} />
    </div>
  );
}

export default ShopDetail;

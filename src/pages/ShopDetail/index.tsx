import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import cn from 'utils/ts/classNames';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import { fetchShop } from 'api/shop';
import StarRatingPreview from 'components/StarRating/StarRatingPreview';
import { ReactComponent as BookMarkIcon } from 'assets/svg/shop/book-mark.svg';
import { ReactComponent as InfoIcon } from 'assets/svg/shop/info.svg';
import styles from './ShopDetail.module.scss';
import ImageCarousel from './components/ImageCarousel';
import FriendReviewList from './components/ReviewList/FriendReviewList';
import MyReviewList from './components/ReviewList/MyReviewList';
import Map from './components/Map';
import useScrap from './hooks/useScrap';
// import mock from './mock';

const formatPeriod = (period: [number, number]) =>
  period.map((time) => `${time.toString().slice(0, 2)}:${time.toString().slice(2)}`).join('~');

function ShopDetail() {
  const { placeId } = useParams();
  const { scrapId, toggleScrap, isPending } = useScrap(placeId as string);

  const { data } = useQuery({
    queryKey: ['shopDetail'],
    queryFn: () => fetchShop(placeId as string),
  });

  if (data) {
    const {
      // shopId,
      // periods,
      // scrap,
      // openNow,
      // category,
      // placeId,
      name,
      formattedAddress,
      lat,
      lng,
      formattedPhoneNumber,
      totalRating,
      todayPeriod,
      photos,
    } = data.data;

    return (
      <>
        <header className={styles.header}>
          <AuthTopNavigation />
        </header>

        <div className={styles.container}>
          <ImageCarousel imageUrls={photos} />

          <article className={styles['shop-detail']}>
            <section className={styles['detail-main']}>
              <div>
                <div className={styles['detail-main__rating']}>
                  <StarRatingPreview rate={totalRating} />
                  {/* totalRating이 -1인 경우는 아예 별점이 없는 경우를 의미합니다. */}
                  <span>{totalRating === -1 ? '0.0' : totalRating.toFixed(1)}</span>
                </div>
                <div className={styles['detail-main__name']}>
                  <h1>{name}</h1>
                  <button
                    type="button"
                    onClick={toggleScrap}
                    disabled={isPending}
                    className={cn({
                      [styles['scrap-button']]: true,
                      [styles['scrap-button__active']]: scrapId !== null,
                    })}
                  >
                    {scrapId ? (
                      <BookMarkIcon fill="#fff" stroke="#fff" />
                    ) : (
                      <BookMarkIcon stroke="#666" />
                    )}
                    <span>북마크 하기</span>
                  </button>
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
                  <span>{formattedPhoneNumber}</span>
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
            <Map formattedAddress={formattedAddress} latitude={lat} longitude={lng} />
            <MyReviewList placeId={placeId as string} />
          </article>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthTopNavigation />
      <div className={styles.container}>스켈레톤</div>
    </>
  );
}

export default ShopDetail;

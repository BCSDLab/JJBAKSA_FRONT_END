import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import { fetchShop } from 'api/shop';
import StarRatingPreview from 'components/StarRating/StarRatingPreview';
import { ReactComponent as BookMarkIcon } from 'assets/svg/shop/book-mark.svg';
import { ReactComponent as InfoIcon } from 'assets/svg/shop/info.svg';
import styles from './ShopDetail.module.scss';
import ImageCarousel from './components/ImageCarousel';
// import mock from './mock';

function ShopDetail() {
  const { placeId } = useParams();

  const { data } = useQuery('shopDetail', () => fetchShop(placeId as string));

  if (data) {
    const {
      // shopId,
      // placeId,
      name,
      formattedAddress,
      // lat,
      // lng,
      formattedPhoneNumber,
      // openNow,
      totalRating,
      // category,
      todayPeriod,
      // periods,
      // scrap,
      photos,
    } = data.data;

    return (
      <>
        <AuthTopNavigation />
        <div className={styles.container}>
          <ImageCarousel imageUrls={photos} />
          <article className={styles['shop-detail']}>
            <section className={styles['detail-main']}>
              <div>
                <div className={styles['detail-main__rate']}>
                  <StarRatingPreview rate={totalRating} />
                  <span>
                    {totalRating === -1 ? '0.0' : totalRating.toFixed(1)}
                  </span>
                </div>
                <div className={styles['detail-main__name']}>
                  <h1>{name}</h1>
                  <button type="button" onClick={() => {}}>
                    <BookMarkIcon />
                    <span>북마크 하기</span>
                  </button>
                </div>
              </div>

              <div>
                <div className={styles['detail-main__info-name']}>
                  기본 정보
                </div>
                <div className={styles['detail-main__info']}>
                  <span>영업시간</span>
                  <div className={styles['line-divisor']} />
                  <span>
                    {todayPeriod
                      .map((time) => {
                        const hour = time.toString().slice(0, 2);
                        const minute = time.toString().slice(2);
                        return `${hour}:${minute}`;
                      })
                      .join('~')}
                  </span>
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
              <div className={styles['detail-main__report']}>
                <InfoIcon />
                <div>틀린 정보 신고</div>
              </div>
            </section>
            <section>{}</section>
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

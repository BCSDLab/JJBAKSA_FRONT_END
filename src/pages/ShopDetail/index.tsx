import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AuthTopNavigation from 'components/Auth/AuthTopNavigation';
import { fetchShop } from 'api/shop';
import styles from './ShopDetail.module.scss';
import ImageCarousel from './components/ImageCarousel';

function ShopDetail() {
  const { placeId } = useParams();

  const { data } = useQuery('shopDetail', () => fetchShop(placeId as string));

  if (data) {
    const {
      // shopId,
      // placeId,
      name,
      // formattedAddress,
      // lat,
      // lng,
      // formattedPhoneNumber,
      // openNow,
      // totalRating,
      // ratingCount,
      // category,
      // todayPeriod,
      // periods,
      // scrap,
      photos,
    } = data.data;

    return (
      <>
        <AuthTopNavigation />
        <div className={styles.container}>
          <ImageCarousel imageUrls={photos} />
          <div>{name}</div>
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

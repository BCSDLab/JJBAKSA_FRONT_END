import { useNavigate } from 'react-router-dom';

import { FilterShopsListResponse } from 'api/shop/entity';
import defaultImage from 'assets/svg/common/favicon.svg';
import { ReactComponent as PencilkIcon } from 'assets/svg/home/pencil.svg';
import { ReactComponent as StarIcon } from 'assets/svg/post/star.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/shop/book-mark.svg';
import { ReactComponent as NotFoundImageIcon } from 'assets/svg/shop/not-found.svg';
import useLatestDate from 'components/common/SideNavigation/hooks/useLatestDate';
import usePin from 'components/common/SideNavigation/hooks/usePin';
import ReviewList from 'components/common/SideNavigation/Pin/components';
import ImageCarousel from 'components/ImageCarousel';
import { useSelected } from 'store/placeId';
import useRate from 'utils/hooks/useRate';
import useScrap from 'utils/hooks/useScrap';
import useScrapId from 'utils/hooks/useScrapId';

import styles from './Pin.module.scss';

interface PinProps {
  filterShops:FilterShopsListResponse;
}

const newAddress = (address:string) => {
  const firstCommaIndex = address.indexOf(',');
  return address.substring(0, firstCommaIndex);
};
export default function Pin({ filterShops }:PinProps): JSX.Element {
  const navigate = useNavigate();
  const { selected, setSelected } = useSelected();
  const { data } = usePin(selected as string);
  const { scrapId } = useScrapId(selected as string);
  const { rate } = useRate(selected as string);
  const { latestDate } = useLatestDate(selected as string);
  const { toggleScrap, isPending } = useScrap(selected as string, scrapId?.scrapId as number);

  return (
    <div className={styles.container}>
      {selected === null ? (
        <div className={styles.shops}>
          {filterShops.map((shop) => (
            <button
              type="button"
              key={shop.placeId}
              className={styles.shop}
              onClick={() => setSelected(shop.placeId)}
            >
              <div className={styles.detail}>
                <span className={styles.detail__name}>{shop.name}</span>
                <span className={styles.detail__category}>{shop.category}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detail__address}>
                  {newAddress(shop.simpleFormattedAddress)}
                </span>
                <span className={styles.detail__dist}>| {(shop.dist / 1000).toFixed(1)}Km</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.detail__rate}>
                  <StarIcon fill="#FF7F23" width="15" />{shop.rate?.ratingCount === 0 ? 0
                    : (shop.rate.totalRating / shop.rate.ratingCount).toFixed(1)} |
                </span>
                <span className={styles.detail__open}>{shop.openNow ? '영업중' : '영업종료'}</span>
              </div>
              {shop.photos === null ? (
                <div className={styles['empty-photos']}>
                  <NotFoundImageIcon />
                  <div>등록된 사진이 없습니다.</div>
                </div>
              ) : (
                <ul className={styles.photos}>
                  {shop.photos.slice(0, 3).map((photo) => (
                    <li className={styles.photo}>
                      <picture>
                        <source srcSet={defaultImage} />
                        <img
                          src={photo}
                          alt="가게 이미지"
                          className={styles.detail__photo}
                        />
                      </picture>
                    </li>
                  ))}
                </ul>
              )}
            </button>
          ))}
        </div>
      )
        : (
          <>
            <ImageCarousel pathname="pin" imageUrls={data?.photos} />
            <ul>
              <li className={styles.info}>
                <span className={styles.info__name}>{data?.name}</span>
                <span className={styles.info__category}>{data?.category}</span>
                <button
                  type="button"
                  onClick={toggleScrap}
                  disabled={isPending}
                  className={styles['info__scrap-button']}
                >
                  {scrapId?.scrapId ? <BookMarkIcon fill="#FF7F23" /> : <BookMarkIcon stroke="#FF7F23" />}
                  <div>북마크</div>
                </button>
              </li>
              <li className={styles.info}>
                <div className={styles.info__rate}>
                  <StarIcon fill="#FF7F23" width="18" height="18" />{rate}.0
                  {latestDate?.lastDate === null ? ' 마지막 리뷰 없음' : `마지막 리뷰 ${latestDate?.lastDate.replaceAll('-', '/')}`}
                </div>
              </li>
            </ul>
            <ReviewList placeId={selected} />
            <button
              onClick={() => navigate(`/post/${selected}`)}
              type="button"
              className={styles.post}
            ><PencilkIcon fill="#666666" />리뷰 작성하기
            </button>
          </>
        )}
    </div>
  );
}

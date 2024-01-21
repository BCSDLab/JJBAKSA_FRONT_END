import { useNavigate } from 'react-router-dom';

import { ReactComponent as PencilkIcon } from 'assets/svg/home/pencil.svg';
import { ReactComponent as StarIcon } from 'assets/svg/post/star.svg';
import { ReactComponent as BookMarkIcon } from 'assets/svg/shop/book-mark.svg';
import useLatestDate from 'components/common/SideNavigation/hooks/useLatestDate';
import usePin from 'components/common/SideNavigation/hooks/usePin';
import ReviewList from 'components/common/SideNavigation/Pin/components';
import ImageCarousel from 'components/ImageCarousel';
import useRate from 'utils/hooks/useRate';
import useScrap from 'utils/hooks/useScrap';
import useScrapId from 'utils/hooks/useScrapId';

import styles from './Pin.module.scss';

interface PinProps {
  placeId: string;
}

export default function Pin({ placeId }:PinProps): JSX.Element {
  const { data } = usePin(String(placeId));
  const navigate = useNavigate();
  const { scrapId } = useScrapId(String(placeId));
  const { rate } = useRate(placeId);
  const { latestDate } = useLatestDate(placeId);
  const onClick = () => {
    navigate(`/post/${data?.name}`, { state: { placeId } });
  };

  const { toggleScrap, isPending } = useScrap(String(placeId), Number(scrapId));
  return (
    <>
      <ImageCarousel pathname="pin" imageUrls={data?.photos} />
      <ul className={styles.container}>
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
            {latestDate?.lastDate === null ? ' 리뷰 없음' : ` ${latestDate?.lastDate.replaceAll('-', '/')}`}
          </div>
        </li>
      </ul>
      <ReviewList placeId={placeId} />
      <button
        onClick={onClick}
        type="button"
        className={styles.post}
      ><PencilkIcon fill="#666666" />리뷰 작성하기
      </button>
    </>
  );
}

import { ReactComponent as BookMarkIcon } from 'assets/svg/shop/book-mark.svg';
import usePin from 'components/common/SideNavigation/hooks/usePin';
import ImageCarousel from 'components/ImageCarousel';
import useScrap from 'utils/hooks/useScrap';
import useScrapId from 'utils/hooks/useScrapId';

import styles from './Pin.module.scss';

interface PinProps {
  placeId: string;
}

export default function Pin({ placeId }:PinProps): JSX.Element {
  const { data } = usePin(String(placeId));
  const { scrapId } = useScrapId(String(placeId));

  const { toggleScrap, isPending } = useScrap(String(placeId), Number(scrapId));
  return (
    <>
      <ImageCarousel pathname="pin" imageUrls={data?.photos} />
      <div className={styles.container}>
        <div className={styles.container__name}>{data?.name}</div>
        <div className={styles.container__category}>{data?.category}</div>
        <button
          type="button"
          onClick={toggleScrap}
          disabled={isPending}
          className={styles['container__scrap-button']}
        >
          {scrapId ? <BookMarkIcon fill="#FF7F23" /> : <BookMarkIcon stroke="#FF7F23" />}
          <div>북마크</div>
        </button>
      </div>
    </>
  );
}

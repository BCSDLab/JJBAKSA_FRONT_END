import { ReactComponent as BookMarkIcon } from 'assets/svg/shop/book-mark.svg';
import usePin from 'components/common/SideNavigation/hooks/usePin';
import ImageCarousel from 'components/ImageCarousel';
import useScrap from 'utils/hooks/useScrap';

import styles from './Pin.module.scss';

interface PinProps {
  placeId : string | undefined;
}

export default function Pin({ placeId } : PinProps): JSX.Element {
  const { data } = usePin(String(placeId));
  const { scrapId, toggleScrap, isPending } = useScrap(String(placeId), Number(data?.scrap));

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
          {scrapId ? <BookMarkIcon stroke="#FF7F23" /> : <BookMarkIcon fill="#FF7F23" />}
          <div>북마크</div>
        </button>
      </div>
    </>
  );
}

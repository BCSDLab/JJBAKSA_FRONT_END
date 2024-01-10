import { useEffect, useState } from 'react';

import { ReactComponent as BookMarkIcon } from 'assets/svg/shop/book-mark.svg';
import usePin from 'components/common/SideNavigation/hooks/usePin';
import ImageCarousel from 'components/ImageCarousel';
import { useSelected } from 'store/placeId';
import useScrap from 'utils/hooks/useScrap';

import styles from './Pin.module.scss';

export default function Pin(): JSX.Element {
  const { selected } = useSelected();
  const { data } = usePin(String(selected));
  const [scrapId, setScrapId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      const scrapData = Number(data?.scrap);
      setScrapId(scrapData);
    }
  }, [data]);

  const { toggleScrap, isPending } = useScrap(String(selected), scrapId);
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

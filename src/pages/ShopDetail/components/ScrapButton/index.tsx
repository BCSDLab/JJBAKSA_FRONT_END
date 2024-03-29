import { ReactComponent as BookMarkIcon } from 'assets/svg/shop/book-mark.svg';
import useScrap from 'utils/hooks/useScrap';
import cn from 'utils/ts/classNames';

import styles from './ScrapButton.module.scss';

interface Props {
  placeId: string;
  initialScrapId?: number | null | undefined;
}

function ScrapButton({ placeId, initialScrapId = null }: Props) {
  const { scrapId, toggleScrap, isPending } = useScrap(placeId, initialScrapId);

  return (
    <button
      type="button"
      onClick={toggleScrap}
      disabled={isPending}
      className={cn({
        [styles['scrap-button']]: true,
        [styles['scrap-button--active']]: scrapId !== null,
      })}
    >
      {scrapId ? <BookMarkIcon fill="#fff" stroke="#fff" /> : <BookMarkIcon stroke="#666" />}
      <span>{scrapId ? '북마크된 장소' : '북마크 하기'}</span>
    </button>
  );
}

export default ScrapButton;

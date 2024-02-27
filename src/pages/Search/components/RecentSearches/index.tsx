import RecentItem from 'pages/Search/components/RecentItem';
import useRecentSearches from 'pages/Search/hooks/useRecentSearches';
import { useEffect, useRef } from 'react';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './RecentSearches.module.scss';

export default function RecentSearches() {
  const listRef = useRef<HTMLDivElement>(null);

  const { cards, deleteCard, clearStorage } = useRecentSearches();
  const { isMobile } = useMediaQuery();

  const handleMouseOver = (event: MouseEvent) => {
    const list = listRef.current;

    if (list) {
      const { left, right, width } = list.getBoundingClientRect();
      const { clientX } = event;

      if (clientX - left < width / 10) {
        list.scrollLeft -= 10;
      } else if (right - clientX < width / 10) {
        list.scrollLeft += 10;
      }
    }
  };

  useEffect(() => {
    const list = listRef.current;
    list?.addEventListener('mousemove', handleMouseOver);

    return () => {
      list?.removeEventListener('mousemove', handleMouseOver);
    };
  }, []);

  return (
    <div className={styles.container}>
      {cards.length > 0 && (
        <div className={styles.title}>
          {isMobile
            ? <div className={styles.title__color}>최근 검색</div>
            : <div className={styles.title__color}>최근 검색한 식당</div>}
          <button
            type="button"
            onClick={clearStorage}
            className={cn({ [styles.title__color]: true, [styles['title__color--mobile']]: !isMobile })}
          >전체 삭제
          </button>
        </div>
      )}
      <div className={styles.list} ref={listRef}>
        {isMobile ? (
          cards.slice(0, 3).map((card) => (
            <RecentItem
              key={card.placeId}
              card={card}
              deleteCard={deleteCard}
            />
          ))
        ) : (
          cards.map((card) => (
            <RecentItem
              key={card.placeId}
              card={card}
              deleteCard={deleteCard}
            />
          ))
        )}
      </div>
    </div>
  );
}

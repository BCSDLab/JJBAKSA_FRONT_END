import RecentItem from 'pages/Search/components/RecentItem';
import useRecentSearches from 'pages/Search/hooks/useRecentSearches';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './RecentSearches.module.scss';

export default function RecentSearches() {
  const { cards, deleteCard, clearStorage } = useRecentSearches();
  const { isMobile } = useMediaQuery();

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
      <div className={styles.list}>
        {isMobile ? (
          cards.slice(0, 3).map((card) => (
            <RecentItem
              key={card.placeId}
              card={card}
              deleteCard={deleteCard}
            />
          ))
        ) : (
          cards.slice(0, 5).map((card) => (
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

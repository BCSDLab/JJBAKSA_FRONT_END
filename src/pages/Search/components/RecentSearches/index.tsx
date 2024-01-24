import { useEffect, useState } from 'react';

import RecentItem from 'pages/Search/components/RecentItem';
import { Cards } from 'pages/Search/static/entity';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './RecentSearches.module.scss';

export default function RecentSearches() {
  const [cards, setCards] = useState<Cards>([]);
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    const recenteSearchData = localStorage.getItem('recent_search');
    if (!recenteSearchData) {
      localStorage.setItem('recent_search', '[]');
    } else {
      setCards(JSON.parse(recenteSearchData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('recent_search', JSON.stringify(cards));
  }, [cards]);

  const deleteCard = (placeId: string) => {
    setCards((prev) => prev.filter((item) => item.placeId !== placeId));
  };

  const clearStorage = () => {
    setCards([]);
  };

  return (
    <div className={styles.container}>
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
      <div className={styles.list}>
        {cards.map((card, index) => (
          <RecentItem
            key={card.placeId}
            data={card}
            index={index}
            deleteCard={deleteCard}
          />
        ))}
      </div>
    </div>
  );
}

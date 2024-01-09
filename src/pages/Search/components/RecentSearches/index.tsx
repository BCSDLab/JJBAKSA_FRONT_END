import { useEffect, useState } from 'react';

import RecentItem from './components/RecentItem';
import styles from './index.module.scss';

type List = {
  photoToken: string | null,
  name: string,
  category: string,
  placeId: string
}[];

export default function RecentSearches() {
  const [list, setlist] = useState<List>();

  useEffect(() => {
    if (localStorage.getItem('recent')) {
      const recentList = localStorage.getItem('recent') as string;
      setlist(JSON.parse(recentList));
    }
  }, []);

  const clearStorage = () => {
    localStorage.clear();
    setlist([]);
  };

  return (
    <div>
      <div className={styles.title}>
        <div>최근 검색한 식당</div>
        <button type="button" onClick={clearStorage}>전체 삭제</button>
      </div>
      <div className={styles.list}>
        {list && list.map((item) => (
          <RecentItem
            photoToken={item.photoToken ?? null}
            name={item.name}
            category={item.category}
            key={item.placeId}
          />
        ))}
      </div>
    </div>
  );
}

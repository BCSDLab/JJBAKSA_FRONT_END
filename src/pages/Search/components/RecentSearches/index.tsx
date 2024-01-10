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

  // 단일 최근 검색한 상점 삭제
  const deleteItem = (placeId: string) => {
    const recent = localStorage.getItem('recent') as string; // 로컬 스토리지에 recent 키 값이 존재할 때만 deleteItem 실행 가능
    const currentRecentList: List = JSON.parse(recent);
    const removedRecentList = currentRecentList.filter((item) => item.placeId !== placeId);
    localStorage.setItem('recent', JSON.stringify(removedRecentList));
    setlist(removedRecentList);
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
            placeId={item.placeId}
            key={item.placeId}
            deleteItem={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

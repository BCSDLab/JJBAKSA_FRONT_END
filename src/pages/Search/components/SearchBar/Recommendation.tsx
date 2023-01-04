import RECOMMEND_TEXT from 'pages/Search/static/recommend';
import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
import { useRef } from 'react';

export default function Recommendation() {
  const recommendIdx = useRef(Math.floor(Math.random() * RECOMMEND_TEXT.length));

  return (
    <h1 className={styles.search__recommend}>
      {RECOMMEND_TEXT[recommendIdx.current]}
    </h1>
  );
}

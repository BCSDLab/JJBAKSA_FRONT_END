import { useRef } from 'react';
import recommend_text from 'pages/Search/static/recommend';
import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';

export default function Recommendation() {
  const recommendIdx = useRef(new Date().getSeconds() % recommend_text.length);
  return (
    <h1 className={styles.search__recommend}>
      {recommend_text[recommendIdx.current]}
    </h1>
  );
}

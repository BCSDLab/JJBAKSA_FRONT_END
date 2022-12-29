import recommend_text from 'pages/Search/static/recommend';
import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
import { useRef } from 'react';

export default function Recommendation() {
  const recommendIdx = useRef(Math.ceil(Math.random() * 10) % recommend_text.length);

  return (
    <h1 className={styles.search__recommend}>
      {recommend_text[recommendIdx.current]}
    </h1>
  );
}

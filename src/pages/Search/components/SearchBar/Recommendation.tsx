import RECOMMEND_TEXT from 'pages/Search/static/recommend';
import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
import { useRef } from 'react';

export default function Recommendation() {
  const recommendIdx = useRef(Math.floor(Math.random() * RECOMMEND_TEXT.length));

  const recommendationSentence = RECOMMEND_TEXT[recommendIdx.current];

  return (
    <h1 className={styles.search__recommend}>
      {recommendationSentence}
    </h1>
  );
}

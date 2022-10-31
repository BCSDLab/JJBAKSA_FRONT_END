import { useRef } from 'react';
import styles from '../Search.module.scss';
import recommend_text from '../static/recommend';

function Recommend() {
  const recommendIdx = useRef(new Date().getSeconds() % 2);
  return (
    <h1 className={styles.search__recommend}>
      {recommend_text[recommendIdx.current]}
    </h1>
  );
}

export default Recommend;

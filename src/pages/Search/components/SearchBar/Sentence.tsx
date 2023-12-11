import { SHOP_TEXT, POST_TEXT } from 'pages/Search/static/searchText';
import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function Sentence() {
  const location = useLocation();
  const text = location.pathname === '/shop' ? SHOP_TEXT : POST_TEXT;

  const textIndex = useRef(Math.floor(Math.random() * text.length));

  const sentence = text[textIndex.current];

  return (
    <h1 className={styles.search__sentence}>
      {sentence}
    </h1>
  );
}

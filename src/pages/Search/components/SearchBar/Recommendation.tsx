import recommend_text from 'pages/Search/static/recommend';
import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';

export default function Recommendation() {
  const recommendIdx = Math.ceil(Math.random() * 10) % recommend_text.length;

  return (
    <h1 className={styles.search__recommend}>
      {recommend_text[recommendIdx]}
    </h1>
  );
}

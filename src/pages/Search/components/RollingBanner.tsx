import styles from '../Search.module.scss';
import hash_tag from '../static/trend';

export default function RollingBanner() {
  return (
    <div className={styles['search-banner']}>
      <strong>TRENDING</strong>
      <ul className={styles['search-banner__tag-list']}>
        <li className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</li>
        <li className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</li>
        <li className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</li>
      </ul>
    </div>
  );
}

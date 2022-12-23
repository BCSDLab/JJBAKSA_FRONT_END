import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
import useTrendingList from 'pages/Search/hooks/useTrendings';

export default function RollingBanner() {
  const { isLoading, data: trendings } = useTrendingList();

  return (
    isLoading
      ? <div />
      : (
        <div className={styles['search-rolling-banner']}>
          <strong>TRENDING</strong>
          <ul className={styles['search-rolling-banner__tag-list']}>
            <li className={styles['search-rolling-banner__tag']}>{trendings && trendings.map((tag) => `#${tag}`).join(' ')}</li>
            <li className={styles['search-rolling-banner__tag']}>{trendings && trendings.map((tag) => `#${tag}`).join(' ')}</li>
            <li className={styles['search-rolling-banner__tag']}>{trendings && trendings.map((tag) => `#${tag}`).join(' ')}</li>
          </ul>
        </div>
      )
  );
}

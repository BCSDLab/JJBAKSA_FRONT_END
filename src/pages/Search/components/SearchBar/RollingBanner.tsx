import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';
import useTrendingList from 'pages/Search/hooks/useTrendings';

export default function RollingBanner() {
  const { isLoading, data: trendings } = useTrendingList();

  return (
    isLoading
      ? <div />
      : (
        <div className={styles['search-rolling-banner']}>
          <ul className={styles['search-rolling-banner__tag-list']}>
            <li className={styles['search-rolling-banner__tag']}>
              {trendings && trendings.map((tag) => (
                <span className={styles['search-rolling-banner__tag-style']}>
                  #
                  {tag}
                </span>
              ))}
            </li>
            <li className={styles['search-rolling-banner__tag']}>
              {trendings && trendings.map((tag) => (
                <span className={styles['search-rolling-banner__tag-style']}>
                  #
                  {tag}
                </span>
              ))}
            </li>
            <li className={styles['search-rolling-banner__tag']}>
              {trendings && trendings.map((tag) => (
                <span className={styles['search-rolling-banner__tag-style']}>
                  #
                  {tag}
                </span>
              ))}
            </li>
          </ul>
        </div>
      )
  );
}

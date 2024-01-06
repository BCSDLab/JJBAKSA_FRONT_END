import useTrendingList from 'pages/Search/hooks/useTrendings';

import styles from './SearchBar.module.scss';

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
                <span className={styles['search-rolling-banner__tag-style']} key={tag}>
                  {`#${tag}`}
                </span>
              ))}
            </li>
            <li className={styles['search-rolling-banner__tag']}>
              {trendings && trendings.map((tag) => (
                <span className={styles['search-rolling-banner__tag-style']} key={tag}>
                  {`#${tag}`}
                </span>
              ))}
            </li>
            <li className={styles['search-rolling-banner__tag']}>
              {trendings && trendings.map((tag) => (
                <span className={styles['search-rolling-banner__tag-style']} key={tag}>
                  {`#${tag}`}
                </span>
              ))}
            </li>
          </ul>
        </div>
      )
  );
}

import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';

interface Props {
  trendings: string[]
}

export default function RollingBanner({ trendings }: Props) {
  return (
    <div className={styles['search-rolling-banner']}>
      <strong>TRENDING</strong>
      <ul className={styles['search-rolling-banner__tag-list']}>
        <li className={styles['search-rolling-banner__tag']}>{trendings.map((tag) => `#${tag}`).join(' ')}</li>
        <li className={styles['search-rolling-banner__tag']}>{trendings.map((tag) => `#${tag}`).join(' ')}</li>
        <li className={styles['search-rolling-banner__tag']}>{trendings.map((tag) => `#${tag}`).join(' ')}</li>
      </ul>
    </div>
  );
}

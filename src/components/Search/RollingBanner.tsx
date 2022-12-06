import styles from 'pages/Search/Search.module.scss';

interface Props {
  trendings: string[]
}

export default function RollingBanner({ trendings }: Props) {
  return (
    <div className={styles['search-banner']}>
      <strong>TRENDING</strong>
      <ul className={styles['search-banner__tag-list']}>
        <li className={styles['search-banner__tag']}>{trendings.map((tag) => `#${tag}`).join(' ')}</li>
        <li className={styles['search-banner__tag']}>{trendings.map((tag) => `#${tag}`).join(' ')}</li>
        <li className={styles['search-banner__tag']}>{trendings.map((tag) => `#${tag}`).join(' ')}</li>
      </ul>
    </div>
  );
}

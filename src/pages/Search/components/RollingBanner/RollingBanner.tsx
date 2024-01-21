import useTrendingList from 'pages/Search/hooks/useTrendings';

import styles from './RollingBanner.module.scss';

function renderTagList(tags: string[]) {
  return (
    <ul className={styles['banner__tag-list']}>
      {tags.map((tag) => (
        <li className={styles.banner__tag} key={tag}>
          {`#${tag}`}
        </li>
      ))}
    </ul>
  );
}

export default function RollingBanner() {
  const { isLoading, data: trendings } = useTrendingList();
  const safeTrendings = trendings ? trendings.filter((e) => e.length > 0) : [];

  return isLoading ? null : (
    <div className={styles.banner}>
      <div className={styles['banner__tag-lists']}>
        {renderTagList(safeTrendings)}
        {renderTagList(safeTrendings)}
        {renderTagList(safeTrendings)}
      </div>
    </div>
  );
}

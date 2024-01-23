import { useLocation } from 'react-router-dom';

import useTrendingList from 'pages/Search/hooks/useTrendings';
import useSearchForm from 'store/text';

import styles from './RollingBanner.module.scss';

interface Props {
  tags: string[]
}

function TagList({ tags } : Props) {
  const location = useLocation();
  const { setText } = useSearchForm(location.pathname);

  return (
    <ul className={styles['banner__tag-list']}>
      {tags.map((tag) => (
        <li
          className={styles.banner__tag}
          key={tag}
        >
          <button
            className={styles['banner__tag-button']}
            type="button"
            onClick={() => setText(tag)}
          >
            {`# ${tag}`}
          </button>
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
        <TagList tags={safeTrendings} />
        <TagList tags={safeTrendings} />
        <TagList tags={safeTrendings} />
      </div>
      <div className={styles['banner__left-gradient']} />
      <div className={styles['banner__right-gradient']} />
    </div>
  );
}

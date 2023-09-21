import { Link } from 'react-router-dom';
import styles from 'pages/Search/components/RelatedSearches/RelatedSearches.module.scss';
import { ReactComponent as PointerIcon } from 'assets/svg/search/pointer.svg';

interface Props {
  item: string;
}

export default function RelatedItem({ item }: Props) {
  return (
    <Link to={`/search/${item}`} className={styles['search-related-list__wrapper']}>
      <li className={styles['search-related-list__item']}>
        <div className={styles['search-related-list__title']}>
          <div className={styles['search-related-list__icon']}>
            <PointerIcon />
          </div>
          {item}
        </div>
      </li>
    </Link>
  );
}

// 여기가 연관 검색어 부분이다.

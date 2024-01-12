import { Link } from 'react-router-dom';

import { ReactComponent as PointerIcon } from 'assets/svg/search/pointer.svg';

import styles from '../RelatedSearches.module.scss';

interface Props {
  item: string;
}

export default function RelatedItem({ item }: Props) {
  return (
    <Link to={`/shop/${item}`} className={styles['search-related-list__wrapper']}>
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

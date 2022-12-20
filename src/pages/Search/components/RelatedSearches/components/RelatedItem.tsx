import { Link } from 'react-router-dom';
import styles from 'pages/Search/components/RelatedSearches/RelatedSearches.module.scss';
import { ReactComponent as ArrowUpIcon } from 'assets/svg/search/arrow-up.svg';

interface Props {
  item: Item
}

interface Item {
  title: string
}

export default function RelatedItem({ item }: Props) {
  return (
    <Link to={`/search/${item.title}`} className={styles['search-related-list__wrapper']}>
      <li className={styles['search-related-list__item']}>
        {item.title}
        <ArrowUpIcon />
      </li>
    </Link>
  );
}

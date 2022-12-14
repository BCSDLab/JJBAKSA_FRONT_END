import { Link } from 'react-router-dom';
import styles from 'pages/Search/components/RelatedSearches/RelatedSearches.module.scss';

interface Props {
  item: Item
}

interface Item {
  title: string
}

export default function RelatedItem({ item }: Props) {
  return (
    <Link to={`/search/${item.title}`} className={styles['search-related-list__item']}>
      <li className={styles['search-related-list__title']}>{item.title}</li>
    </Link>
  );
}

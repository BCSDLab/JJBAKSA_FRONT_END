import { Link } from 'react-router-dom';
import styles from 'pages/Search/Search.module.scss';

function SuggestionItem({ item } : any) {
  return (
    <Link to={`/search/${item.title}`} style={{ color: 'black', textDecoration: 'none' }}>
      <li className={styles['search-query-list__item']}>{item.title}</li>
    </Link>
  );
}

export default SuggestionItem;

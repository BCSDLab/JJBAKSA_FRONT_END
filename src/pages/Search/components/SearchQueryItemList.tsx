import PreviousButton from 'components/PreviousButton/PreviousButton';
import { useParams } from 'react-router-dom';
import styles from '../Search.module.scss';
import SearchNavigationBar from './SearchNavigationBar';

function SearchQueryItemList() {
  const { searchQuery } = useParams();

  return (
    <div className={styles.search}>
      <SearchNavigationBar>
        <PreviousButton />
        <h1 className={styles['search-nav__text']}>{searchQuery}</h1>
      </SearchNavigationBar>
    </div>
  );
}

export default SearchQueryItemList;

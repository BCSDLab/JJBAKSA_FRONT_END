import React from 'react';
import { useParams } from 'react-router-dom';
// import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import styles from '../Search.module.scss';
import SearchNavigationBar from './SearchNavigationBar';
import PreviousButton from './PreviousButton';

function SearchQueryItemList() {
  const { searchQuery } = useParams();

  return (
    <div className={styles.search}>
      <SearchNavigationBar>
        {/* <Link to="/search" className={styles['search-nav__button--previous']}>
          <PreviousIcon title="이전 페이지로 이동" />
        </Link> */}
        <PreviousButton to="/search" />
        <h1 className={styles['search-nav__text']}>{searchQuery}</h1>
      </SearchNavigationBar>
    </div>
  );
}

export default SearchQueryItemList;

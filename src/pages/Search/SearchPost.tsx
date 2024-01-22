/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NavigationBar from 'pages/Search/components/NavigationBar';
import RollingBanner from 'pages/Search/components/RollingBanner/RollingBanner';
import SearchInput from 'pages/Search/components/SearchBar/SearchInput';
import Sentence from 'pages/Search/components/Sentence/Sentence';
import Suggestions from 'pages/Search/components/Suggestions';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import { POST_TEXT, SHOP_TEXT } from 'pages/Search/static/searchText';
import SearchDetails from 'pages/SearchDetails';
import useSearchForm from 'store/text';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import RecentSearches from './components/RecentSearches';
import styles from './Search.module.scss';

export default function SearchPost(): JSX.Element {
  const location = useLocation();
  const subText = location.pathname === '/shop' ? SHOP_TEXT : POST_TEXT;
  const {
    text, handleChange, handleSubmit, isEnter, resetText,
  } = useSearchForm(location.pathname);
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    resetText();
  }, [location]);

  return (
    <div className={styles.search}>
      {isMobile && <NavigationBar />}
      {isEnter
        ? <SearchDetails />
        : (
          <>
            <Sentence subText={subText} />
            <SearchInput
              className={styles.search__input}
              onChange={handleChange}
              onSubmit={handleSubmit}
              text={text}
            />
            {isSearching ? <Suggestions className={styles['related-searches']} text={text} /> : <RollingBanner />}
            <RecentSearches />
          </>
        )}
    </div>
  );
}

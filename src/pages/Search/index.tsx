/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import NavigationBar from 'pages/Search/components/NavigationBar';
import RecentSearches from 'pages/Search/components/RecentSearches';
import RollingBanner from 'pages/Search/components/RollingBanner';
import SearchInput from 'pages/Search/components/SearchInput';
import Sentence from 'pages/Search/components/Sentence';
import Suggestions from 'pages/Search/components/Suggestions';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import { POST_TEXT, SHOP_TEXT } from 'pages/Search/static/searchText';
import SearchDetails from 'pages/SearchDetails';
import useSearchForm from 'store/text';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './Search.module.scss';

export default function Search(): JSX.Element {
  const location = useLocation();
  const subText = location.pathname === '/shop' ? SHOP_TEXT : POST_TEXT;
  const {
    text, handleChange, handleSubmit, isEnter, resetText,
  } = useSearchForm(location.pathname);

  const inputRef = useRef(null);
  const isSearching = useSearchingMode({ inputRef });
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    resetText();
  }, [location]);

  return (
    <div className={styles.container}>
      {isMobile && <NavigationBar />}
      {isEnter
        ? <SearchDetails />
        : (
          <>
            <Sentence subText={subText} />
            <div className={styles.search}>
              <SearchInput
                className={styles.search__input}
                value={text}
                ref={inputRef}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onDelete={resetText}
              />
              {isSearching && (
                <Suggestions
                  className={styles['search__related-searches']}
                  text={text}
                />
              )}
              <RollingBanner />
              <RecentSearches />
            </div>
          </>
        )}
    </div>
  );
}

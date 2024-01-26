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
import useSearchForm from 'store/text';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './Search.module.scss';

export default function Search(): JSX.Element {
  const location = useLocation();
  const subText = location.pathname === '/shop' ? SHOP_TEXT : POST_TEXT;
  const prevWord = location.pathname.startsWith('/shop') ? '검색' : '리뷰하기';
  const {
    text, resetText,
  } = useSearchForm(location.pathname);

  const inputRef = useRef(null);
  const { isText: isSearching } = useSearchingMode({ inputRef });
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    resetText();
  }, [location]);

  return (
    <div className={styles.container}>
      {isMobile && <NavigationBar prevWord={prevWord} />}
      <Sentence subText={subText} />
      <div className={styles.search}>
        <SearchInput
          className={styles.search__input}
          ref={inputRef}
        />
        {isSearching && (
          <Suggestions
            className={styles.search__suggestions}
            text={text}
          />
        )}
        <RollingBanner />
        <RecentSearches />
      </div>
    </div>
  );
}

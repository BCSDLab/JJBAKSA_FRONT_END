/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import Previous from 'pages/Search/components/Previous';
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
  const subtext = location.pathname === '/shop' ? SHOP_TEXT : POST_TEXT;
  const prevText = location.pathname.startsWith('/shop') ? '검색' : '리뷰하기';
  const {
    text, resetText,
  } = useSearchForm(location.pathname);

  const inputRef = useRef(null);
  const { isSearching } = useSearchingMode({ inputRef });
  const { isMobile } = useMediaQuery();

  useEffect(() => {
    resetText();
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.box__shade} />
        {isMobile && <Previous className={styles.box__previous} prevText={prevText} />}
      </div>

      <div className={styles.search}>
        <Sentence
          className={styles.search__subtext}
          subtext={subtext}
        />
        {!isMobile && isSearching && (
          <Suggestions
            className={styles.search__suggestions}
            text={text}
          />
        )}
        <SearchInput
          className={styles.search__input}
          ref={inputRef}
        />
        <RollingBanner />
        <RecentSearches />
      </div>
    </div>
  );
}

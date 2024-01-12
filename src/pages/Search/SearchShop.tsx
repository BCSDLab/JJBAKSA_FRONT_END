/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NavigationBar from 'pages/Search/components/NavigationBar/index';
import RelatedSearches from 'pages/Search/components/RelatedSearches/index';
import RollingBanner from 'pages/Search/components/SearchBar/RollingBanner';
import SearchInput from 'pages/Search/components/SearchBar/SearchInput';
import Sentence from 'pages/Search/components/SearchBar/Sentence';
import useSearchingMode from 'pages/Search/hooks/useSearchingMode';
import { POST_TEXT, SHOP_TEXT } from 'pages/Search/static/searchText';
import SearchDetails from 'pages/SearchDetails';
import useSearchForm from 'store/text';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import RecentSearches from './components/RecentSearches';
import styles from './Search.module.scss';

export default function SearchShop(): JSX.Element {
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

  if (isMobile) {
    return (
      <div className={styles.search}>
        <NavigationBar />
        {isEnter
          ? <SearchDetails />
          : (
            <>
              <Sentence subText={subText} />
              <SearchInput
                onChange={handleChange}
                onSubmit={handleSubmit}
                text={text}
              />
              {isSearching ? <RelatedSearches text={text} /> : <RollingBanner />}
              <RecentSearches />
            </>
          )}
      </div>
    );
  }
  return (
    <div className={styles.search}>
      {isEnter
        ? <SearchDetails />
        : (
          <>
            <Sentence subText={subText} />
            <SearchInput
              onChange={handleChange}
              onSubmit={handleSubmit}
              text={text}
            />
            {isSearching ? <RelatedSearches text={text} /> : <RollingBanner />}
            <RecentSearches />
          </>
        )}
    </div>
  );
}

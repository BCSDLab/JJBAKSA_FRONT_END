/* eslint-disable react-hooks/exhaustive-deps */
import styles from 'pages/Search/Search.module.scss';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import SearchDetails from 'pages/SearchDetails';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useSearchForm from 'store/text';
import Recommendation from './components/SearchBar/Recommendation';
import SearchInput from './components/SearchBar/SearchInput';
import RollingBanner from './components/SearchBar/RollingBanner';
import NavigationBar from './components/NavigationBar';
import RelatedSearches from './components/RelatedSearches';
import useSearchingMode from './hooks/useSearchingMode';

export default function SearchPost(): JSX.Element {
  const location = useLocation();
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
        <section>
          <NavigationBar />
          <Recommendation />
          <SearchInput
            onChange={handleChange}
            onSubmit={handleSubmit}
            text={text}
          />
          {isSearching ? <RelatedSearches text={text} /> : <RollingBanner />}
        </section>
      </div>
    );
  }
  return (
    <div className={styles.search}>
      <section>
        {isEnter
          ? <SearchDetails />
          : (
            <>
              <Recommendation />
              <SearchInput
                onChange={handleChange}
                onSubmit={handleSubmit}
                text={text}
              />
              {isSearching ? <RelatedSearches text={text} /> : <RollingBanner />}
            </>
          )}
      </section>
    </div>
  );
}

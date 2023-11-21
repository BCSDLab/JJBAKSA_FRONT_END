import React, { useState } from 'react';
import styles from 'pages/Search/Search.module.scss';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import SearchDetails from 'pages/SearchDetails';
import useBooleanState from 'utils/hooks/useBooleanState';
import Recommendation from './components/SearchBar/Recommendation';
import SearchInput from './components/SearchBar/SearchInput';
import RollingBanner from './components/SearchBar/RollingBanner';
import NavigationBar from './components/NavigationBar';
import RelatedSearches from './components/RelatedSearches';
import useSearchingMode from './hooks/useSearchingMode';
import ResentSearches from './components/SearchBar/RecentSearches';

const useSearchForm = () => {
  const [text, setText] = useState('');
  const [isEnter,,,toggle] = useBooleanState(false);
  const [submittedText, setSubmittedText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text) {
      setSubmittedText(text);
      toggle();
    }
  };

  return {
    text,
    handleChange,
    handleSubmit,
    submittedText,
    isEnter,
    toggle,
  };
};

export default function Search(): JSX.Element {
  const {
    text, handleChange, handleSubmit, isEnter,
  } = useSearchForm();
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();

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
              {isSearching ? <RelatedSearches text={text} /> : (
                <>
                  <RollingBanner />
                  <ResentSearches />
                </>
              )}
            </>
          )}

      </section>
    </div>
  );
}

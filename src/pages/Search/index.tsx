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

const useSearchForm = () => {
  const [text, setText] = useState('');
  const [isEnter,,,toggle] = useBooleanState(false);
  const [submittedText, setSubmittedText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text) {
      setSubmittedText(text);
      toggle();
    }
  };

  return {
    text,
    handleChange,
    handleEnter,
    submittedText,
    isEnter,
    toggle,
  };
};

export default function Search(): JSX.Element {
  const {
    text, handleChange, handleEnter, isEnter,
  } = useSearchForm();
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <div className={styles.search}>
        <section>
          {isMobile && <NavigationBar />}
          {!isEnter && !isSearching && <Recommendation />}
        </section>
      </div>
    );
  }
  return (
    <div className={styles.search}>
      <section>
        {!isEnter && <Recommendation />}
        {!isEnter
          ? (
            <>
              <SearchInput
                onChange={handleChange}
                onKeyDown={handleEnter}
                text={text}
              />
              {isSearching ? <RelatedSearches text={text} /> : <RollingBanner />}
            </>
          )
          : <SearchDetails />}
      </section>
    </div>
  );
}

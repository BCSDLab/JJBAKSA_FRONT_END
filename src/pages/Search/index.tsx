import React, { useEffect, useState } from 'react';
import styles from 'pages/Search/Search.module.scss';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import SearchDetails from 'pages/SearchDetails';
import Recommendation from './components/SearchBar/Recommendation';
import SearchInput from './components/SearchBar/SearchInput';
import RollingBanner from './components/SearchBar/RollingBanner';
import NavigationBar from './components/NavigationBar';
import RelatedSearches from './components/RelatedSearches';
import useSearchingMode from './hooks/useSearchingMode';

const useSearchForm = () => {
  const [text, setText] = useState('');
  const [entered, setEntered] = useState(false);
  const [submittedText, setSubmittedText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setEntered(false);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text) {
      setSubmittedText(text);
      setEntered(true);
    }
  };

  useEffect(() => {
    setEntered(false);
  }, [text]);

  return {
    text,
    handleChange,
    handleEnter,
    submittedText,
    entered,
  };
};

export default function Search(): JSX.Element {
  const {
    text, handleChange, handleEnter, entered,
  } = useSearchForm();
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();

  return (
    <div>
      <div className={styles.search}>
        <section>
          {isMobile && <NavigationBar />}
          {!entered && (
            (isMobile && !isSearching) || !isMobile
          ) && <Recommendation />}
          {!isMobile && !entered
            ? <SearchInput onChange={handleChange} text={text} onKeyDown={handleEnter} />
            : <SearchDetails />}
          {!isMobile && isSearching && !entered && <RelatedSearches text={text} />}
          {!isMobile && !isSearching && !entered && <RollingBanner />}
        </section>
      </div>
    </div>
  );
}

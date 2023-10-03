import React, { useState } from 'react';
import styles from 'pages/Search/Search.module.scss';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import Recommendation from './components/SearchBar/Recommendation';
import SearchInput from './components/SearchBar/SearchInput';
import RollingBanner from './components/SearchBar/RollingBanner';
import NavigationBar from './components/NavigationBar';
import RelatedSearches from './components/RelatedSearches';
import useSearchingMode from './hooks/useSearchingMode';

const useSearchForm = () => {
  const [text, setText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return {
    text,
    handleChange,
  };
};

export default function Search(): JSX.Element {
  const { text, handleChange } = useSearchForm();
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();
  return (
    <div>
      <div className={styles.search}>
        <section>
          {isMobile && <NavigationBar />}
          {isMobile ? !isSearching && <Recommendation /> : <Recommendation />}
          <SearchInput onChange={handleChange} text={text} />
          {isMobile ? !isSearching && <RollingBanner /> : <RollingBanner />}
        </section>
        <RelatedSearches text={text} />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import styles from 'pages/Search/Search.module.scss';
import Recommendation from './components/SearchBar/Recommendation';
import SearchInput from './components/SearchBar/SearchInput';
import RollingBanner from './components/SearchBar/RollingBanner';
import NavigationBar from './components/NavigationBar';
import RelatedSearches from './components/RelatedSearches';
import useSearchingMode from './hooks/useSearchingMode';

const useSearchForm = () => {
  const [text, setText] = useState('');
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setText((e.target.value));
  };

  return {
    text, handleChange,
  };
};

export default function Search(): JSX.Element {
  const { text, handleChange } = useSearchForm();
  const isSearching = useSearchingMode();

  return (
    <div className={styles.search}>
      <section>
        <NavigationBar />
        {!isSearching && <Recommendation />}
        <SearchInput
          onChange={handleChange}
          text={text}
        />
        {!isSearching && <RollingBanner />}
      </section>
      <RelatedSearches text={text} />
    </div>
  );
}

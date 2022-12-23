import React, { useState } from 'react';
import styles from 'pages/Search/Search.module.scss';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import Recommendation from './components/SearchBar/Recommendation';
import SearchInput from './components/SearchBar/SearchInput';
import RollingBanner from './components/SearchBar/RollingBanner';
import NavigationBar from './components/NavigationBar';
import RelatedSearches from './components/RelatedSearches';
import useTrendingList from './hooks/useTrendings';
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
  const { isLoading, data: trendings } = useTrendingList();
  const isSearching = useSearchingMode();
  const { isMobile } = useMediaQuery();
  console.log('isMoblie', isMobile);

  return (
    <div className={styles.search}>
      <section>
        <NavigationBar />
        {!isSearching && <Recommendation />}
        <SearchInput
          onChange={handleChange}
          text={text}
        />
        {!isLoading && !isSearching && <RollingBanner trendings={trendings} />}
      </section>
      <RelatedSearches text={text} />
    </div>
  );
}

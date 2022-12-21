import React, { useState } from 'react';
import cn from 'utils/ts/classNames';
import styles from 'pages/Search/Search.module.scss';
import Recommendation from './components/SearchBar/Recommendation';
import SearchInput from './components/SearchBar/SearchInput';
import RollingBanner from './components/SearchBar/RollingBanner';
import NavigationBar from './components/NavigationBar';
import RelatedSearches from './components/RelatedSearches';
import useTrendingList from './hooks/useTrendings';
import useSearchingMode from './hooks/useSearchingMode';

const useSearchForm = () => {
  const [text, setText] = useState('');
  const handleText = (e : React.ChangeEvent<HTMLInputElement>) => {
    setText((e.target.value));
  };

  return {
    text, handleText,
  };
};

export default function Search(): JSX.Element {
  const { text, handleText } = useSearchForm();
  const { isLoading, data } = useTrendingList();
  const isSearching = useSearchingMode();

  return (
    <div className={styles.search}>
      <section className={cn({
        [styles['search-wrapper']]: true,
        [styles['search-wrapper--search']]: isSearching,
      })}
      >
        <NavigationBar />
        {!isSearching && <Recommendation />}
        <SearchInput
          onChange={handleText}
          text={text}
        />
        {!isLoading && !isSearching && <RollingBanner trendings={data} />}
      </section>
      <RelatedSearches text={text} />
    </div>
  );
}

import { useSearchParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import cn from 'utils/ts/classNames';
import { useTrendingList } from 'api/search';
import MODE from 'pages/Search/static/mode';
import styles from 'pages/Search/Search.module.scss';
import NavigationBar from './NavBar/NavigationBar';
import SearchInput from './SearchBar/SearchInput';
import Recommendation from './SearchBar/Recommendation';
import RollingBanner from './SearchBar/RollingBanner';
import RelatedSearches from './RelatedSearches/RelatedSearches';

type CurrentMode = string | null;

function useSearchForm() {
  const [text, setText] = useState('');
  const handleText = (e : React.ChangeEvent<HTMLInputElement>) => {
    setText((e.target.value));
  };

  return {
    text, handleText,
  };
}

function useMode() {
  const [searchParams] = useSearchParams();
  const currentMode : CurrentMode = searchParams.get('mode') || MODE.trending;
  const [mode, setMode] = useState(currentMode);
  const changeMode = useCallback((event: MouseEvent) => {
    if ((event.target as Element).id === 'searchBarInput') {
      setMode(MODE.search);
    } else if ((event.target as Element).id === 'root') {
      setMode(MODE.trending);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', changeMode);

    return () => {
      document.removeEventListener('click', changeMode);
    };
  }, [changeMode, mode]);

  return mode;
}

function Search(): JSX.Element {
  const { text, handleText } = useSearchForm();
  const { isLoading, data } = useTrendingList();
  const mode = useMode();

  return (
    <div className={styles.search}>
      <section className={cn({
        [styles['search-wrapper']]: true,
        [styles['search-wrapper--search']]: mode === MODE.search,
      })}
      >
        <NavigationBar />
        {mode === MODE.trending && <Recommendation />}
        <SearchInput
          onChange={handleText}
          text={text}
        />
        {!isLoading && mode === MODE.trending && <RollingBanner trendings={data} />}
      </section>
      <RelatedSearches mode={mode} text={text} />
    </div>
  );
}

export default Search;

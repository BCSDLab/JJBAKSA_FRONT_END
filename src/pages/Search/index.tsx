import { useSearchParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import cn from 'utils/ts/classNames';
import { useTrendingQuery } from 'api/search';
import styles from './Search.module.scss';
import Suggestion from '../../components/Search/components/Suggestion';
import Navigation from '../../components/Search/components/Navigation';
import SearchInput from '../../components/Search/components/SearchInput';
import RollingBanner from '../../components/Search/components/RollingBanner';
import Recommendation from '../../components/Search/components/Recommendation';
import MODE from '../../components/Search/static/mode';

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
  const { isLoading, trendings } = useTrendingQuery();
  const mode = useMode();

  return (
    <div className={styles.search}>
      <section className={cn({
        [styles['search-wrapper']]: true,
        [styles['search-wrapper--search']]: mode === MODE.search,
      })}
      >
        <Navigation />
        {mode === MODE.trending && <Recommendation />}
        <SearchInput
          onChange={handleText}
          text={text}
        />
        {!isLoading && mode === MODE.trending && <RollingBanner trendings={trendings} />}
      </section>
      <Suggestion mode={mode} text={text} />
    </div>
  );
}

export default Search;

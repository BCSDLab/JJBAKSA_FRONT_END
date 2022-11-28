import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import cn from 'utils/ts/classNames';
import styles from './Search.module.scss';
import Suggestion from './components/Suggestion';
import Navigation from './components/Navigation';
import SearchInput from './components/SearchInput';
import RollingBanner from './components/RollingBanner';
import { useTrendingQuery } from './api/index';
import Recommendation from './components/Recommendation';
import MODE from './static/mode';

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
  const changeMode = (event: MouseEvent) => {
    if ((event.target as Element).id === 'root' && mode === MODE.search) {
      setMode(MODE.trending);
    } else setMode(MODE.search);
  };

  useEffect(() => {
    document.addEventListener('click', changeMode);

    return () => {
      document.removeEventListener('click', changeMode);
    };
  });

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

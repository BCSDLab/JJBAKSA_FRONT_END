import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'utils/ts/classNames';
import RollingBanner from './components/RollingBanner';
import list from './static/data';
import styles from './Search.module.scss';
import Suggestion from './components/Suggestion';
import Navigation from './components/Navigation';
import Recommend from './components/Recommend';
import SearchInput from './components/SearchInput';

type CurrentMode = string | null;

function useSearchForm(state : CurrentMode) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState(state);

  const handleText = (e : React.ChangeEvent<HTMLInputElement>) => {
    setText((e.target.value));
  };

  const changeSearchMode = () => {
    setMode('search');
  };

  const changeTrendingMode = () => {
    setMode('trending');
    setText('');
  };

  const click = (event :any) => {
    if (event.target.id === 'root' && mode === 'search') {
      setMode('trending');
    } else setMode('search');
  };

  useEffect(() => {
    document.addEventListener('click', click);

    return () => {
      document.removeEventListener('click', click);
    };
  });
  return {
    text, mode, handleText, changeSearchMode, changeTrendingMode,
  };
}

function Search(): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentMode : CurrentMode = searchParams.get('mode');
  const {
    text, mode, handleText, changeSearchMode, changeTrendingMode,
  } = useSearchForm(currentMode || 'trending');

  return (
    <div className={styles.search}>
      <section className={cn({
        [styles['search-wrapper']]: true,
        [styles['search-wrapper--search']]: mode === 'search',
      })}
      >
        <Navigation />
        {mode === 'trending' && <Recommend />}
        <SearchInput
          onFocus={changeSearchMode}
          onBlur={changeTrendingMode}
          onChange={handleText}
          text={text}
        />
        {mode === 'trending' && (<RollingBanner />)}
      </section>
      <Suggestion mode={mode} list={list} text={text} />
    </div>
  );
}

export default Search;

import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import cn from 'utils/ts/classNames';
import RollingBanner from './components/RollingBanner';
import list from './static/data';
import styles from './Search.module.scss';
import Suggestion from './components/Suggestion';
import Navigation from './components/Navigation';
import SearchInput from './components/SearchInput';
import Recommendation from './components/Recommendation';

type CurrentMode = string | null;

const useSearchForm = (state : CurrentMode) => {
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

  return {
    text, mode, handleText, changeSearchMode, changeTrendingMode,
  };
};

export default function Search(): JSX.Element {
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
        {mode === 'trending' && <Recommendation />}
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

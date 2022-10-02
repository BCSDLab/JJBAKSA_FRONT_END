import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import { ReactComponent as LensIcon } from 'assets/svg/lens.svg';
import { Link, useSearchParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import list from './static/data';
import styles from './Search.module.scss';
import recommend_text from './static/recommend';
import cn from '../../utils/ts/classNames';
import RollingBanner from './components/RollingBanner';

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

  const recommendIdx = useRef(new Date().getSeconds() % 2);

  return (
    <div className={styles.search}>
      <section className={cn({
        [styles['search-wrapper']]: true,
        [styles['search-wrapper--search']]: mode === 'search',
      })}
      >
        <nav className={styles['search-nav']}>
          <div className={styles['search-nav__button']}>
            <Link to="/" className={styles['search-nav__button--previous']}>
              <PreviousIcon title="이전 페이지로 이동" />
            </Link>
          </div>
          <h1 className={styles['search-nav__text']}>검색</h1>
        </nav>
        {mode === 'trending' && (
        <h1 className={styles.search__recommend}>
          {recommend_text[recommendIdx.current]}
        </h1>
        )}
        <label title="검색어 입력" className={styles['search-bar']} htmlFor="searchBarInput">
          <input className={styles['search-bar__input']} id="searchBarInput" onFocus={changeSearchMode} onBlur={changeTrendingMode} placeholder="검색어를 입력해주세요" value={text} onChange={handleText} />
          <LensIcon title="검색" className={styles['search-bar__icon']} />
        </label>
        {mode === 'trending' && (
        <RollingBanner />
        )}
      </section>
      <ul className={cn({
        [styles['search-query-list']]: true,
        [styles['search-query-list--hidden']]: mode === 'trending',
      })}
      >
        {/* 이 부분은 검색창 리스트 필터링 확인을 위해서 임의로 목업 데이터 사용 */}
        {list?.filter((item) => item.title.includes(text)).length === 0
        && (
        <div className={styles['search-query-list__text--not-found']}>
          해당
          {` ${text} `}
          관련 음식점/게시물을 찾을 수 없습니다.
        </div>
        )}
        {text === '' ? null : list?.filter((item) => item.title.includes(text)).map((item) => <li key={item.title} className={styles['search-query-list__item']}>{item.title}</li>)}
      </ul>
    </div>
  );
}

export default Search;

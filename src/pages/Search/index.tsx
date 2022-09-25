import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import { ReactComponent as LensIcon } from 'assets/svg/lens.svg';
import { Link, useSearchParams } from 'react-router-dom';
import { useRef } from 'react';
import list from './static/data';
import styles from './Search.module.scss';
import hash_tag from './static/trend';
import recommend_text from './static/recommend';
import useSearch from './useSearch';

type ICurrentMode = string | null;

function Search(): JSX.Element {
  const [searchParams] = useSearchParams();
  const currentMode : ICurrentMode = searchParams.get('mode');
  const {
    text, mode, textHandler, focusHandler, blurHandler,
  } = useSearch(currentMode || 'trending');

  const recommendIdx = useRef(new Date().getSeconds() % 2);

  return (
    <div className={styles.search}>
      <nav className={styles['search-nav']}>
        <div className={styles['search-nav__button']}>
          <Link to="/" className={styles['search-nav__button--previous']}>
            <PreviousIcon className={styles['search-nav__icon--previous']} />
          </Link>
        </div>
        <h1 className={styles['search-nav__text']}>검색</h1>
      </nav>
      <div role="main">
        {mode === 'trending' && (
        <h1 className={styles.search__recommend}>
          {recommend_text[recommendIdx.current]}
        </h1>
        )}
        <label aria-label="검색창" className={styles['search-bar']} htmlFor="searchBarInput">
          <input className={styles['search-bar__input']} id="searchBarInput" onFocus={focusHandler} onBlur={blurHandler} placeholder="검색어를 입력해주세요" value={text} onChange={(event) => textHandler(event)} />
          <LensIcon className={styles['search-bar__icon']} />
        </label>
        {mode === 'trending' && (
        <div aria-label="맛집 트렌드 해시태그 리스트" className={styles['search-banner']}>
          <strong>TRENDING</strong>
          <ul className={styles['search-banner__tag-list']}>
            <span className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</span>
            <span aria-label="" className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</span>
            <span aria-label="" className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</span>
          </ul>
        </div>
        )}
        <menu className={styles['search-query-list']}>
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
        </menu>
      </div>
    </div>
  );
}

export default Search;

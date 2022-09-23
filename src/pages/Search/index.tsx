import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import { ReactComponent as LensIcon } from 'assets/svg/lens.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRef } from 'react';
import list from './static/data';
import styles from './Search.module.scss';
import hash_tag from './static/trend';
import RECOMMEND_TEXT from './static/recommend';
import useSearch from './useSearch';

// interface ICurrentMode {
//   currentMode : 'trending' | 'search'
// }

function Search(): JSX.Element {
  const [searchParams] = useSearchParams();
  const curMode : string | null = searchParams.get('mode');
  const {
    text, mode, textHandler, focusHandler, blurHandler,
  } = useSearch(curMode ? curMode as 'trending' | 'search' : 'trending');

  const recommendIdx = useRef(new Date().getSeconds() % 2);
  const navigate = useNavigate();
  return (
    <div className={styles.search}>
      <div aria-label="상단 바" className={styles['search-nav']}>
        <button
          aria-label="메인 페이지로 돌아가는 버튼"
          className={styles['search-nav__button--previous-button']}
          type="button"
          onClick={() => navigate('/')}
        >
          <PreviousIcon className={styles['search-nav__icon--previous-icon']} />
        </button>
        <h1 className={styles['search-nav__text']}>검색</h1>
      </div>
      <div role="main">
        {mode === 'trending' && (
        <h1 className={styles.search__recommend}>
          {RECOMMEND_TEXT[recommendIdx.current]}
        </h1>
        )}
        <label aria-label="검색창" className={styles['search-bar']} htmlFor="searchBarInput">
          <input className={styles['search-bar__input']} id="searchBarInput" onFocus={focusHandler} onBlur={blurHandler} placeholder="검색어를 입력해주세요" value={text} onChange={(event) => textHandler(event)} />
          <LensIcon className={styles['search-bar__icon']} />
        </label>
        {mode === 'trending' && (
        <div aria-label="맛집 트렌드 해시태그 리스트" className={styles['search-banner']}>
          <strong aria-label="맛집 트렌드">TRENDING</strong>
          <ul className={styles['search-banner__tag-list']}>
            <span className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</span>
            <span aria-label="" className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</span>
            <span aria-label="" className={styles['search-banner__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</span>
          </ul>
        </div>
        )}
        <menu aria-label="검색 결과" className={styles['search-query-list']}>
          {/* 이 부분은 검색창 리스트 필터링 확인을 위해서 임의로 목업 데이터 사용 */}
          {list?.filter((item) => item.title.includes(text)).length === 0
          && (
          <div role="presentation" className={styles['search-query-list__text--not-found']}>
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

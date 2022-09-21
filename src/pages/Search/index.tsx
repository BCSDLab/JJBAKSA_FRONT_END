import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import { ReactComponent as LensIcon } from 'assets/svg/lens.svg';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import list from './static/data';
import styles from './Search.module.scss';
import hash_tag from './static/trend';
import RECOMMEND_TEXT from './static/recommend';

function Search(): JSX.Element {
  const [text, setText] = useState('');
  const [mode, setMode] = useState('trending');
  const recommendIdx = useRef(new Date().getSeconds() % 2);
  const navigate = useNavigate();

  const focusHandler = () => {
    setMode('search');
  };

  const blurHandler = () => {
    setMode('trending');
  };

  return (
    <div className={styles.search}>
      <div aria-label="상단 바" className={styles.search__nav}>
        <button
          aria-label="메인 페이지로 돌아가는 버튼"
          className={styles['search__nav__button--previous-button']}
          type="button"
          onClick={() => navigate('/')}
        >
          <PreviousIcon className={styles['search__nav__icon--previous-icon']} />
        </button>
        <h1 className={styles.search__nav__text}>검색</h1>
      </div>
      <div role="main">
        {mode === 'trending' && (
        <h1 className={styles.search__recommend}>
          {RECOMMEND_TEXT[recommendIdx.current]}
        </h1>
        )}
        <label aria-label="검색창" className={styles.search__bar} htmlFor="searchBarInput">
          <input className={styles.search__bar__input} id="searchBarInput" onFocus={focusHandler} onBlur={blurHandler} placeholder="검색어를 입력해주세요" value={text} onChange={(event) => setText(event.target.value)} />
          <LensIcon className={styles.search__bar__icon} />
        </label>
        {mode === 'trending' && (
        <div aria-label="맛집 트렌드 해시태그 리스트" className={styles['search__trend-banner']}>
          <strong aria-label="맛집 트렌드">TRENDING</strong>
          <ul className={styles['search__trend-banner__tag-list']}>
            <b className={styles['search__trend-banner__tag-list__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</b>
            <b className={styles['search__trend-banner__tag-list__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</b>
            <b className={styles['search__trend-banner__tag-list__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</b>
          </ul>
        </div>
        )}
        <menu aria-label="검색 결과" className={styles['search__query-list']}>
          {/* 이 부분은 검색창 리스트 필터링 확인을 위해서 임의로 목업 데이터 사용 */}
          {text === '' ? null : list?.filter((item) => item.title.includes(text)).map((item) => <li key={item.title} className={styles['search__query-list__item']}>{item.title}</li>)}
        </menu>
      </div>
    </div>
  );
}

export default Search;

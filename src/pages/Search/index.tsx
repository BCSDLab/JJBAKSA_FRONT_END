import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import { ReactComponent as LensIcon } from 'assets/svg/lens.svg';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import robots from './data';
import styles from './Search.module.scss';
import hash_tag from './trend';

interface IItem {
  title: string,
  type: string,
  description: string,
  filename: string,
  height: number,
  width: number,
  price: number,
  rating: number
}
const RECOMMEND_TEXT = [
  '오늘은\n어떤 음식이 땡기나요?',
  '기름진 음식이\n그리운 날!',
];

function Search(): JSX.Element {
  const [text, setText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const recommendIdx = useRef(new Date().getSeconds() % 2);
  const list = robots;
  const navigate = useNavigate();

  const focusHandler = () => {
    // setIsFocus(true);
  };

  const blurHandler = () => {
    setIsFocus(false);
  };
  return (
    <div className={styles.search}>
      <div aria-label="상단 바" className={styles['search-header']}>
        <button
          className={styles['search-header__previous-button']}
          type="button"
          aria-label="메인 페이지로 돌아가는 버튼"
          onClick={() => navigate('/')}
        >
          <PreviousIcon className={styles['search-header__previous-icon']} />
        </button>
        <h1 className={styles['search-header__text']}>검색</h1>
      </div>
      <div role="main">
        <section>
          {!isFocus && <h1 className={styles['search-recommend']}>{RECOMMEND_TEXT[recommendIdx.current]}</h1>}
          <label aria-label="검색창" htmlFor="searchBarInput" className={styles['search-bar']}>
            <input id="searchBarInput" onFocus={focusHandler} onBlur={blurHandler} className={styles['search-bar__input']} placeholder="검색어를 입력해주세요" value={text} onChange={(event) => setText(event.target.value)} />
            <LensIcon className={styles['search-bar__icon']} />
          </label>
          <div aria-label="맛집 트렌드 해시태그" className={styles['search-trend']}>
            <strong>TRENDING</strong>
            <div className={styles['search-trend__tag-list--wrapper']}>
              <ul className={styles['search-trend__tag-list']}>
                <b className={styles['search-trend__tag-list__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</b>
                <b className={styles['search-trend__tag-list__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</b>
                <b className={styles['search-trend__tag-list__tag']}>{hash_tag.map((tag) => tag.text).join(' ')}</b>
              </ul>
            </div>
          </div>
          <menu aria-label="검색 결과" className={styles['search-list']}>
            {text === '' ? null : list?.filter((item) => item.title.includes(text)).map((item : IItem) => <li key={item.title} className={styles['search-list__item']}>{item.title}</li>)}
          </menu>
        </section>
      </div>
    </div>
  );
}

export default Search;

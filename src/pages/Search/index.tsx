import { ReactComponent as PreviousIcon } from 'assets/svg/previous.svg';
import { ReactComponent as LensIcon } from 'assets/svg/lens.svg';
import { useState } from 'react';
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
  '기름진 음식이 그리운 날!',
];

function Search(): JSX.Element {
  const [text, setText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
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
      <div className={styles['search-header']}>
        <button
          className={styles['search-header__previous-button']}
          type="button"
          aria-label="이전 버튼"
          onClick={() => navigate('/')}
        >
          <PreviousIcon className={styles['search-header__previous-icon']} />
        </button>
        <div className={styles['search-header__text']}>검색</div>
      </div>
      {!isFocus && <h1 className={styles['search-recommend']}>{RECOMMEND_TEXT[0]}</h1>}
      <div className={styles['search-bar']}>
        <input onFocus={focusHandler} onBlur={blurHandler} className={styles['search-bar__input']} placeholder="검색어를 입력해주세요" value={text} onChange={(event) => setText(event.target.value)} />
        <LensIcon className={styles['search-bar__icon']} />
      </div>
      <div className={styles['search-trend']}>
        <strong>TRENDING</strong>
        <ul className={styles['search-trend__tag-list']}>
          {hash_tag.map((tag) => <li className={styles['search-trend__tag-list__tag']} key={tag.id}>{tag.text}</li>)}
        </ul>
      </div>
      <ul className={styles['search-list']}>
        {text === '' ? null : list?.filter((item) => item.title.includes(text)).map((item : IItem) => <li key={item.title} className={styles['search-list__item']}>{item.title}</li>)}
      </ul>
    </div>
  );
}

export default Search;

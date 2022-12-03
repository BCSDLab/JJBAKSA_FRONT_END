import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';
import styles from 'pages/Search/Search.module.scss';

function SearchInput({
  text, onChange,
}: any) {
  return (
    <label title="검색어 입력" className={styles['search-bar']} htmlFor="searchBarInput">
      <input
        className={styles['search-bar__input']}
        id="searchBarInput"
        placeholder="검색어를 입력해주세요."
        value={text}
        onChange={onChange}
      />
      <LensIcon title="검색" className={styles['search-bar__icon']} />

    </label>
  );
}

export default SearchInput;

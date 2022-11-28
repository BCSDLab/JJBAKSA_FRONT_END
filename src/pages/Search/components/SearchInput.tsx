import { ReactComponent as LensIcon } from 'assets/svg/lens.svg';
import styles from '../Search.module.scss';

function SearchInput({
  onClick, text, onChange,
}: any) {
  return (
    <label title="검색어 입력" className={styles['search-bar']} htmlFor="searchBarInput">
      <input
        className={styles['search-bar__input']}
        id="searchBarInput"
        placeholder="검색어를 입력해주세요."
        value={text}
        onClick={onClick}
        onChange={onChange}
      />
      <LensIcon title="검색" className={styles['search-bar__icon']} />
    </label>
  );
}

export default SearchInput;
import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';
import styles from './SearchBar.module.scss';

interface Props {
  text: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLensIconClick: () => void;
}

export default function SearchInput({
  text, onChange, onLensIconClick,
}: Props) {
  return (
    <label title="검색어 입력" className={styles.searchBar} htmlFor="searchBarInput">
      <input
        className={styles.searchBar__input}
        id="searchBarInput"
        placeholder="검색어를 입력해주세요."
        value={text}
        onChange={onChange}
      />
      <LensIcon
        title="검색"
        className={styles.searchBar__icon}
        onClick={onLensIconClick}
        role="button"
        tabIndex={0}
      />
    </label>
  );
}

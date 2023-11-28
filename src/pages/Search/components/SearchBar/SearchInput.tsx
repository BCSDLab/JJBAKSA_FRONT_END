import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';
import styles from 'pages/Search/components/SearchBar/SearchBar.module.scss';

interface Props {
  text: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default function SearchInput({
  text, onChange, onSubmit,
}: Props) {
  return (
    <label title="검색어 입력" aria-label="검색어 입력" className={styles['search-bar']} htmlFor="searchBarInput">
      <form onSubmit={onSubmit} className={styles['search-bar__form']}>
        <input
          className={styles['search-bar__input']}
          placeholder="검색어를 입력해주세요."
          id="searchBarInput"
          autoComplete="off"
          value={text}
          onChange={onChange}
        />
        <LensIcon title="검색" className={styles['search-bar__icon']} />
      </form>
    </label>
  );
}

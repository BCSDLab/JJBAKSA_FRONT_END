import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';
import styles from './SearchBar.module.scss';

interface Props {
  className?: string;
  text: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLensIconClick: () => void;
}

export default function SearchInput({
  className, text, onChange, onLensIconClick,
}: Props) {
  return (
    <div className={className}>
      <label
        className={styles['search-bar']}
        title="검색어 입력"
        htmlFor="searchBarInput"
      >
        <input
          className={styles['search-bar__input']}
          id="searchBarInput"
          placeholder="검색어를 입력해주세요."
          value={text}
          onChange={onChange}
        />
        <LensIcon
          title="검색"
          className={styles['search-bar__icon']}
          onClick={onLensIconClick}
          role="button"
          tabIndex={0}
        />
      </label>
    </div>
  );
}

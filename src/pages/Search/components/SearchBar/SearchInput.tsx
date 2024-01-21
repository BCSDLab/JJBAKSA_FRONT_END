/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';

import styles from './SearchBar.module.scss';

interface Props {
  text: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default function SearchInput({
  text, onChange, onSubmit,
}: Props) {
  return (
    <label
      className={styles['search-bar']}
      title="검색어 입력"
      aria-label="검색어 입력"
      htmlFor="search-bar-input"
    >
      <form
        className={styles['search-bar__form']}
        onSubmit={onSubmit}
      >
        <input
          className={styles['search-bar__input']}
          placeholder="검색어를 입력해주세요."
          id="search-bar-input"
          autoComplete="off"
          value={text}
          onChange={onChange}
        />
        <button type="submit">
          <LensIcon title="검색" className={styles['search-bar__icon']} />
        </button>
      </form>
    </label>
  );
}

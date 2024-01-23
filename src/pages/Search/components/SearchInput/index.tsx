/* eslint-disable jsx-a11y/control-has-associated-label */
import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';

import styles from './SearchInput.module.scss';

interface Props {
  className: string,
  text: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export default function SearchInput({
  className, text, onChange, onSubmit,
}: Props) {
  return (
    <div className={className}>
      <label
        className={styles['search-bar']}
        title="검색어 입력"
        aria-label="검색어 입력"
        htmlFor="search-bar-input"
      >
        <form
          className={styles['search-bar__form']}
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <input
            className={styles['search-bar__input']}
            placeholder="검색어를 입력해주세요."
            id="search-bar-input"
            value={text}
            onChange={onChange}
          />
          <button type="submit">
            <LensIcon title="검색" className={styles['search-bar__icon']} />
          </button>
        </form>
      </label>
    </div>
  );
}

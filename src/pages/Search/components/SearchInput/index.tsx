/* eslint-disable jsx-a11y/control-has-associated-label */
import { forwardRef } from 'react';

import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';

import styles from './SearchInput.module.scss';

interface Props {
  className: string,
  value: string,
  inputRef: React.MutableRefObject<null>,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function SearchInput({
  className, value, inputRef, onChange, onSubmit,
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
            value={value}
            ref={inputRef}
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

export default forwardRef(SearchInput);

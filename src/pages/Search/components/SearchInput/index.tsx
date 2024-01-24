/* eslint-disable jsx-a11y/control-has-associated-label */
import { forwardRef } from 'react';

import { ReactComponent as DeleteIcon } from 'assets/svg/search/delete.svg';
import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';

import styles from './SearchInput.module.scss';

interface Props {
  className: string,
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    className, value, onChange, onSubmit, onDelete,
  } = props;

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
            ref={ref}
            onChange={onChange}
          />
          <button type="button" onClick={onDelete}>
            <DeleteIcon title="삭제" className={styles['search-bar__delete']} />
          </button>
          <button type="submit">
            <LensIcon title="검색" className={styles['search-bar__lens']} />
          </button>
        </form>
      </label>
    </div>
  );
});

export default SearchInput;

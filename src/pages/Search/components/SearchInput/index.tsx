/* eslint-disable jsx-a11y/control-has-associated-label */
import { forwardRef } from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as DeleteIcon } from 'assets/svg/search/delete.svg';
import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';
import useSearchForm from 'store/text';

import styles from './SearchInput.module.scss';

interface Props {
  className: string
}

const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className } = props;
  const location = useLocation();

  const {
    text, resetText, handleChange, handleSubmit,
  } = useSearchForm(location.pathname);

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
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <input
            className={styles['search-bar__input']}
            placeholder="검색어를 입력해주세요."
            id="search-bar-input"
            value={text}
            ref={ref}
            onChange={handleChange}
          />
          {text.length > 0 && (
            <button type="button" onClick={resetText}>
              <DeleteIcon title="삭제" className={styles['search-bar__delete']} />
            </button>
          )}
          <button type="submit">
            <LensIcon title="검색" className={styles['search-bar__lens']} />
          </button>
        </form>
      </label>
    </div>
  );
});

export default SearchInput;

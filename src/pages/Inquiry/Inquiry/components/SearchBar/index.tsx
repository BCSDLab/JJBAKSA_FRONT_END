import { useState } from 'react';
import { ReactComponent as LensIcon } from 'assets/svg/search/lens.svg';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  className?: string;
  onSearchChange: (text: string) => void;
  onSearchSubmit: () => void;
}

export default function SearchBar({
  className, onSearchChange, onSearchSubmit,
}: SearchBarProps) {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    // 부모 컴포넌트에 상태 변화 전달
    onSearchChange(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    // 제출 시 부모 컴포넌트에서 작업 수행
    onSearchSubmit();
  };

  return (
    <div className={className}>
      <div className={styles['search-bar']}>
        <form onSubmit={handleSubmit} className={styles['search-bar__form']}>
          <input
            className={styles['search-bar__input']}
            placeholder="검색어를 입력해주세요."
            value={text}
            onChange={handleChange}
          />
          <LensIcon
            title="검색"
            className={styles['search-bar__icon']}
            onClick={() => handleSubmit()}
            role="button"
            tabIndex={0}
          />
        </form>
      </div>
    </div>
  );
}

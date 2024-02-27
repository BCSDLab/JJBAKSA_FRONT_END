import cn from 'utils/ts/classNames';

import styles from './CategorySelect.module.scss';

interface Props {
  className: string;
  onClick: () => void;
  isCafe: boolean;
}

export default function CategorySelect({ className, isCafe, onClick }: Props) {
  return (
    <div className={className}>
      <button
        className={styles.select}
        type="button"
        aria-label="보기 선택 카페/음식점"
        onClick={onClick}
      >
        <div
          className={cn({
            [styles.category]: true,
            [styles['category--selected']]: isCafe,
          })}
        >
          카페
        </div>
        <div
          className={cn({
            [styles.category]: true,
            [styles['category--selected']]: !isCafe,
          })}
        >
          음식점
        </div>
      </button>
    </div>
  );
}

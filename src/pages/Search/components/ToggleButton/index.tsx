import cn from 'utils/ts/classNames';

import styles from './ToggleButton.module.scss';

interface Props {
  className: string;
  onClick: () => void;
  isActive: boolean;
}

export default function ToggleButton({ className, onClick, isActive }: Props) {
  return (
    <div className={className}>
      <label
        className={cn({
          [styles.toggle]: true,
          [styles['toggle--active']]: isActive,
        })}
        htmlFor="toggle-input"
      >
        <input
          className={styles.toggle__input}
          type="checkbox"
          aria-label="자동완성 활성화/비활성화"
          id="toggle-input"
          checked={isActive}
          onChange={onClick}
        />
        <span
          className={cn({
            [styles.toggle__circle]: true,
            [styles['toggle__circle--active']]: isActive,
          })}
        />
      </label>
    </div>
  );
}

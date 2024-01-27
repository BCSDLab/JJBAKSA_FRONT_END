import cn from 'utils/ts/classNames';

import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
  className: string;
  isActive: boolean;
  toggle: () => void;
}

export default function ToggleButton({
  className, isActive, toggle,
}: ToggleButtonProps): JSX.Element {
  const handleToggle = () => {
    toggle();
  };

  return (
    <span className={className}>
      <label
        className={cn({
          [styles.toggle__label]: true,
          [styles['toggle__label--active']]: isActive,
        })}
        htmlFor="toggle-input"
      >
        <input
          className={styles.toggle__input}
          type="checkbox"
          aria-label="토글"
          id="toggle-input"
          checked={isActive}
          onChange={() => handleToggle()}
        />
        <span
          className={cn({
            [styles.toggle__circle]: true,
            [styles['toggle__circle--active']]: isActive,
          })}
        />
      </label>
    </span>
  );
}

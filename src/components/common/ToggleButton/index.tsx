import cn from 'utils/ts/classNames';
import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
  className: string;
  isSecret: boolean;
  toggle: () => void;
}

export default function ToggleButton({
  className, isSecret, toggle,
}: ToggleButtonProps): JSX.Element {
  const handleToggle = () => {
    toggle();
  };

  return (
    <span className={className}>
      <label
        className={cn({
          [styles.toggle__label]: true,
          [styles['toggle__label--active']]: isSecret,
        })}
        htmlFor="toggleInput"
      >
        <input
          className={styles.toggle__input}
          type="checkbox"
          aria-label="토글"
          id="toggleInput"
          checked={isSecret}
          onChange={() => handleToggle()}
        />
        <span
          className={cn({
            [styles.toggle__circle]: true,
            [styles['toggle__circle--active']]: isSecret,
          })}
        />
      </label>
    </span>
  );
}

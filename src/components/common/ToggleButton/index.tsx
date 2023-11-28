import { useState } from 'react';
import cn from 'utils/ts/classNames';
import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
  className: string;
  firstState: boolean;
  toggleFn: () => void;
}

export default function ToggleButton({
  className, firstState, toggleFn,
}: ToggleButtonProps): JSX.Element {
  const [toggle, setToggle] = useState(firstState);

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
    toggleFn();
  };

  return (
    <span className={className}>
      <label
        className={cn({
          [styles.toggle__label]: true,
          [styles['toggle__label--active']]: toggle,
        })}
        htmlFor="toggleInput"
      >
        <input
          className={styles.toggle__input}
          type="checkbox"
          aria-label="토글"
          id="toggleInput"
          checked={toggle}
          onChange={() => handleToggle()}
        />
        <span
          className={cn({
            [styles.toggle__circle]: true,
            [styles['toggle__circle--active']]: toggle,
          })}
        />
      </label>
    </span>
  );
}

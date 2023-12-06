import cn from 'utils/ts/classNames';
import useBooelanState from 'utils/hooks/useBooleanState';
import styles from './ToggleButton.module.scss';

interface ToggleButtonProps {
  className: string;
  firstState: boolean;
  toggleExternalState: () => void;
}

export default function ToggleButton({
  className, firstState, toggleExternalState,
}: ToggleButtonProps): JSX.Element {
  const [active, , , toggle] = useBooelanState(!!firstState || false);

  const handleToggle = () => {
    toggle();
    toggleExternalState();
  };

  return (
    <span className={className}>
      <label
        className={cn({
          [styles.toggle__label]: true,
          [styles['toggle__label--active']]: active,
        })}
        htmlFor="toggleInput"
      >
        <input
          className={styles.toggle__input}
          type="checkbox"
          aria-label="토글"
          id="toggleInput"
          checked={active}
          onChange={() => handleToggle()}
        />
        <span
          className={cn({
            [styles.toggle__circle]: true,
            [styles['toggle__circle--active']]: active,
          })}
        />
      </label>
    </span>
  );
}

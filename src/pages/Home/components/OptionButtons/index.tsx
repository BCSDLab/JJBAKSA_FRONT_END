import FilterMenu from './FilterMenu';
import styles from './OptionButtons.module.scss';

export default function OptionButtons(): JSX.Element {
  return (
    <div className={styles.button}>
      <FilterMenu />
    </div>
  );
}

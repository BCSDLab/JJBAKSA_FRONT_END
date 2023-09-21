import styles from 'pages/Search/components/RelatedSearches/components/ToggleButton.module.scss';

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  toggle: boolean;
}

export default function ToggleButton({ onClick, toggle }: Props) {
  return (
    <button type="submit" onClick={onClick} data-toggle={toggle ? 'true' : 'false'} className={`${styles.ToggleButton} ${toggle ? styles.active : ''}`}>
      <div data-toggle={toggle ? 'true' : 'false'} className={styles.circle} />
    </button>
  );
}

import styles from 'pages/Search/components/RelatedSearches/components/ToggleButton.module.scss';

interface Props {
  onClick: () => void;
  isActive: boolean;
}

export default function ToggleButton({ onClick, isActive }: Props) {
  return (
    <button type="button" onClick={onClick} data-toggle={isActive ? 'true' : 'false'} className={`${styles.ToggleButton} ${isActive ? styles.active : ''}`}>
      <div data-toggle={isActive ? 'true' : 'false'} className={styles.circle} />
    </button>
  );
}

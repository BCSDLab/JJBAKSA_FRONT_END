import { ReactComponent as Arrow } from 'assets/svg/home/arrow.svg';

import styles from './LocationSelectButton.module.scss';

interface Props {
  address: string | null;
  onClick: () => void;
}

export default function LocationSelectButton({ address, onClick }: Props): JSX.Element {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
    >
      {address ? (
        <div className={styles.button__text}>{address}</div>
      ) : (
        <div className={styles.button__text}>위치 정보를 가져오는 중...</div>
      )}
      <Arrow className={styles['button__down-arrow']} />
    </button>
  );
}

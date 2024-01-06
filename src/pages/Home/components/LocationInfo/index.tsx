import { ReactComponent as Arrow } from 'assets/svg/home/arrow.svg';

import styles from './LocationInfo.module.scss';

interface LocationInfoProps {
  address: string | null;
  onClick: () => void;
}

export default function LocationInfo({ address, onClick }: LocationInfoProps): JSX.Element {
  return (
    <button
      type="button"
      className={styles['map-container']}
      onClick={onClick}
    >
      {address ? (
        <div className={styles['map-container__text']}>{address}</div>
      ) : (
        <div className={styles['map-container__text']}>위치 정보를 가져오는 중...</div>
      )}
      <Arrow className={styles['map-container__image']} />
    </button>
  );
}

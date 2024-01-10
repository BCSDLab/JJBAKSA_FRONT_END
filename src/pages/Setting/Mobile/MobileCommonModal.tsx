import { createPortal } from 'react-dom';

import styles from './MobileCommonModal.module.scss';

interface Props {
  children: React.ReactNode;
  setIsShowError: (value: boolean) => void
}

export default function MobileCommonModal({ children, setIsShowError }: Props) {
  const root = document.body;
  return createPortal(
    <div className={styles.container}>
      <div className={styles.overay} />
      <div className={styles.modal}>
        <div className={styles.modal__content}>{children}</div>
        <button
          type="button"
          className={styles.modal__close}
          onClick={() => setIsShowError(false)}
        >
          닫기
        </button>
      </div>
    </div>,
    root,
  );
}

import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import { ReactComponent as Favicon } from 'assets/svg/common/favicon.svg';
import { useClearAuth } from 'store/auth';
import { useFilterFriend, useFilterNearby, useFilterScrap } from 'store/filter';
import { useSelected } from 'store/placeId';
import cn from 'utils/ts/classNames';

import styles from '../PC/PasswordSuccessModal.module.scss';

interface Props {
  children: React.ReactNode;
  setIsShowModal: (value: boolean) => void;
}
export default function MobileLogoutModal({ children, setIsShowModal }: Props) {
  const root = document.body;
  const clearAuth = useClearAuth();

  const { setFilterFriend } = useFilterFriend();
  const { setFilterScrap } = useFilterScrap();
  const { setFilterNearby } = useFilterNearby();
  const { setSelected } = useSelected();
  return createPortal(
    <div className={styles.container}>
      <div className={styles.overay} />
      <div className={styles.modal}>
        <Favicon />
        <div className={styles.modal__title}>
          로그아웃을 진행하실건가요?
        </div>
        <div className={styles.modal__content}>{children}</div>
        <div className={styles.modal__container}>
          <button
            type="button"
            className={cn({
              [styles['modal__button--cancel']]: true,
            })}
            onClick={() => setIsShowModal(false)}
          >
            취소
          </button>
          <Link
            to="/login"
            onClick={() => {
              clearAuth(); setSelected('');
              setFilterFriend(true);
              setFilterNearby(true);
              setFilterScrap(true);
            }}
          ><button type="button" className={styles.modal__button}>확인</button>
          </Link>
        </div>

      </div>
    </div>,
    root,
  );
}

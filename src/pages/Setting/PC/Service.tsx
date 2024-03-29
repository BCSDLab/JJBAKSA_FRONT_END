import { Link } from 'react-router-dom';

import { ReactComponent as Move } from 'assets/svg/setting/movement.svg';
import LogoutModal from 'pages/Setting/PC/LogoutModal';
import useBooleanState from 'utils/hooks/useBooleanState';

import styles from './Service.module.scss';

export default function Service() {
  const [isShowModal, , , , setIsShowModal] = useBooleanState(false);
  return (
    <div className={styles.service}>
      <div className={styles.service__container}>
        <div className={styles.service__content}>
          <div className={styles.service__text}>공지사항</div>
          <Link to="/notice">
            <button type="button" className={styles.service__announcement} aria-label="공지사항으로 이동">
              <Move />
            </button>
          </Link>
        </div>
        <div className={styles.service__content}>
          <div className={styles.service__text}>문의하기</div>
          <Link to="/inquiry/all">
            <button type="button" className={styles.service__announcement} aria-label="문의하기로 이동">
              <Move />
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <button
          type="button"
          className={styles['bottom__log-out']}
          onClick={() => setIsShowModal(true)}
        >
          로그아웃

        </button>
        {isShowModal && <LogoutModal closeModal={setIsShowModal}>로그인 페이지로 돌아갑니다.</LogoutModal>}
        <Link to="/withdrawal">
          <div className={styles['bottom__delete-account']}>탈퇴하기</div>
        </Link>
      </div>
    </div>
  );
}

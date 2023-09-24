import { Link } from 'react-router-dom';
import { ReactComponent as Move } from 'assets/svg/setting/movement.svg';
import { useState } from 'react';
import styles from './Service.module.scss';
import LogoutModal from './LogoutModal';

export default function Service() {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <div className={styles.service}>
      <div className={styles.service__container}>
        <div className={styles.service__contents}>
          <div className={styles.service__text}>공지사항</div>
          <Link to="/notice">
            <button type="submit" className={styles.service__announcement}>
              <Move />
            </button>
          </Link>
        </div>
        <div className={styles.service__contents}>
          <div className={styles.service__text}>문의하기</div>
          <Link to="/inquiry">
            <button type="submit" className={styles.service__announcement}>
              <Move />
            </button>
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <button
          type="button"
          className={styles['bottom__log-out']}
          onClick={() => {
            setIsShowModal(true);
          }}
        >
          로그아웃

        </button>
        {isShowModal && <LogoutModal>로그인 페이지로 돌아갑니다.</LogoutModal>}
        <Link to="/withdrawal">
          <div className={styles['bottom__delete-account']}>탈퇴하기</div>
        </Link>
      </div>
    </div>
  );
}

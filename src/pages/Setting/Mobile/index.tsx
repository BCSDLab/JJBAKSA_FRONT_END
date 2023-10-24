import { ReactComponent as ArrowRight } from 'assets/svg/setting/arrow-right.svg';
import { ReactComponent as Move } from 'assets/svg/setting/movement.svg';
import { Link } from 'react-router-dom';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import { ReactComponent as Version } from 'assets/svg/setting/version-check.svg';
import styles from './Setting.module.scss';
import MobileCommonModal from './MobileCommonModal';
import useModifyPassword from '../hook/useModifyPassword';
import MobileLogoutModal from './MobileLogoutModal';

export default function MobileSetting() {
  const {
    setIsShowError, isShowError, setIsShowModal, isShowModal,
  } = useModifyPassword();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['header__left-arrow']}>
          <PreviousButton />
        </div>
        <div className={styles.header__title}>설정</div>
      </div>
      <div className={styles.account}>
        <div className={styles['account__sub-title']}>계정 관리</div>
        <div className={styles.account__content}>
          <div className={styles.account__text}>비밀번호 변경 </div>
          <Link to="id-Change">
            <button type="submit" className={styles['account__right-arrow']}>
              <ArrowRight />
            </button>
          </Link>
        </div>
        <Link to="/" className={styles.link}>
          <div className={styles.account__content}>
            <div className={styles.account__text}>개인정보 이용방침</div>
            <div className={styles.policy__announcement}>
              <Move />
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.service}>
        <div className={styles['service__sub-title']}>서비스</div>
        <div className={styles.service__content}>
          <div className={styles.service__text}>공지사항</div>
          <Link to="/notice">
            <button type="submit" className={styles.service__announcement}>
              <Move />
            </button>
          </Link>
        </div>
        <div className={styles.service__content}>
          <div className={styles.service__text}>문의하기</div>
          <Link to="/inquiry/all">
            <button type="submit" className={styles.service__announcement}>
              <Move />
            </button>
          </Link>
        </div>
        <div className={styles.service__content}>
          <div className={styles.service__text}>
            앱 버전
            <Version onClick={() => setIsShowError(true)} className={styles.service__version} />
          </div>
          <div className={styles['service__app-version']}>
            현재 1.2.0 / 최신 1.2.0
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <button
          type="button"
          onClick={() => setIsShowModal(true)}
          className={styles['bottom__log-out']}
        >
          로그아웃
        </button>
        <Link to="/withdrawal">
          <div className={styles['bottom__delete-account']}>탈퇴하기</div>
        </Link>
      </div>
      {isShowError && (
        <MobileCommonModal setIsShowError={setIsShowError}>
          앱 버전이 달라요.
          <br />
          더 나은 서비스 경험을 위해 앱스토어에서
          <br />
          업데이트를 해주세요.

        </MobileCommonModal>
      )}
      {isShowModal && (
        <MobileLogoutModal setIsShowModal={setIsShowModal}>
          쩝쩝박사 로그아웃을 진행하시면
          로그인 페이지로 돌아갑니다.
        </MobileLogoutModal>
      )}
    </div>
  );
}

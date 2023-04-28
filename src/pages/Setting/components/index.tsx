import { ReactComponent as ArrowRight } from 'assets/svg/setting/arrow-right.svg';
import { ReactComponent as Move } from 'assets/svg/setting/movement.svg';
import { Link } from 'react-router-dom';
import { useAuth } from 'store/auth';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import styles from './Setting.module.scss';

export default function Setting() {
  const auth = useAuth();

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
        <div className={styles.account__contents}>
          <div className={styles.account__text}>아이디 변경</div>
          <div className={styles.account__box}>
            <div className={styles.account__id}>{auth?.account}</div>
            <Link to="id-Change">
              <button type="submit" className={styles['account__right-arrow']}>
                <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.account__contents}>
          <div className={styles.account__text}>비밀번호 변경 </div>
          <Link to="id-Change">
            <button type="submit" className={styles['account__right-arrow']}>
              <ArrowRight />
            </button>
          </Link>
        </div>
        <Link to="/" className={styles.link}>
          <div className={styles.account__contents}>
            <div className={styles.account__text}>개인정보 이용방침</div>
            <div className={styles.policy__announcement}>
              <Move />
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.service}>
        <div className={styles['service__sub-title']}>서비스</div>
        <Link to="/" className={styles.link}>
          <div className={styles.service__contents}>
            <div className={styles.service__text}>공지사항</div>
            <div className={styles.policy__announcements}>
              <Move />
            </div>
          </div>
        </Link>
        <div className={styles.service__contents}>
          <div className={styles.service__text}>문의하기</div>
          <Link to="/inquiry">
            <button type="submit" className={styles.service__announcement}>
              <Move />
            </button>
          </Link>
        </div>
        <div className={styles.service__contents}>
          <div className={styles.service__text}>앱 버전</div>
          <div className={styles['service__app-version']}>
            현재 1.2.0 / 최신 1.2.0
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Link to="/">
          <button type="submit" className={styles['bottom__log-out']}>로그아웃</button>
        </Link>
        <Link to="/">
          <div className={styles['bottom__delete-account']}>탈퇴하기</div>
        </Link>
      </div>
    </div>
  );
}

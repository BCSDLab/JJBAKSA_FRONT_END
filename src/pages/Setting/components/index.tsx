import { Link } from 'react-router-dom';
// import { ReactComponent as ArrowLeft } from 'assets/svg/setting/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/svg/setting/arrow-right.svg';
import { ReactComponent as Move } from 'assets/svg/setting/movement.svg';
import { useAuth } from 'store/auth';
import PreviousButton from 'components/PreviousButton/PreviousButton';
import styles from './Setting.module.scss';

export default function Setting(): JSX.Element {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.head}>

        <div className={styles['head__left-arrow']}>
          <PreviousButton />
        </div>
        <div className={styles.title}>설정</div>
      </div>
      <div className={styles.account}>
        <div className={styles['sub-title']}>계정 관리</div>
        <div className={styles.block}>
          <div className={styles['account-text']}>아이디 변경</div>
          <div className={styles['current-text']}>{auth?.account}</div>
          <div className={styles['id__right-arrow']}>
            <Link to="/"><ArrowRight /></Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles['account-text']}>비밀번호 변경 </div>
          <div className={styles['password__right-arrow']}>
            <Link to="/"><ArrowRight /></Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles['account-text']}>개인정보 이용방침</div>
          <div className={styles.policy__announcement}>
            <Link to="/"><Move /></Link>
          </div>
        </div>
      </div>
      <div className={styles.service}>
        <div className={styles['sub-title']}>서비스</div>
        <div className={styles.block}>
          <div className={styles['service-text']}>공지사항</div>
          <div className={styles.service__announcement}>
            <Link to="/"><Move /></Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles['service-text']}>문의하기</div>
          <div className={styles.service__announcement}>
            <Link to="/"><Move /></Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles['service-text']}>앱 버전</div>
          <div className={styles['app-version--imformation']}>
            현재 1.2.0 / 최신 1.2.0
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles['bottom__log-out']}>로그아웃</div>
        <div className={styles['bottom__delete-account']}>탈퇴하기</div>
      </div>
    </div>
  );
}

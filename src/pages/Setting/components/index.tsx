import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from 'assets/svg/setting/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/svg/setting/arrow-right.svg';
import { ReactComponent as Move } from 'assets/svg/setting/movement.svg';
import styles from './Setting.module.scss';

export default function Setting(): JSX.Element {
  return (
    <div className={styles.container}>

      <div className={styles.head}>
        <div className={styles['title__navigation--back']}>
          <Link to="/"><ArrowLeft /></Link>
        </div>
        <div className={styles.title__Setting}>설정</div>
      </div>

      <div className={styles.account}>
        <div className={styles['account-setting']}>계정 관리</div>
        <div className={styles['account-setting__id']}>
          <div className={styles['account-Setting__id--change']}>아이디 변경</div>
          <div className={styles['id-id']}>fgnsdbcxb</div>
          <div className={styles['account-setting__id--move']}>
            <Link to="/"><ArrowRight /></Link>
          </div>
        </div>
        <div className={styles['account-setting__password']}>
          <div className={styles['account-setting__password--change']}>비밀번호 변경 </div>
          <div className={styles['account-setting__password--move']}>
            <Link to="/"><ArrowRight /></Link>
          </div>
        </div>
        <div className={styles['account-setting__password__personal-information']}>
          <div className={styles['account-Setting__personal-information--manual']}>개인정보 이용방침</div>
          <div className={styles['account-setting__password__personal-information--move']}>
            <Link to="/"><Move /></Link>
          </div>
        </div>
      </div>

      <div className={styles['service-block']}>
        <div className={styles['service-title']}>서비스</div>
        <div className={styles['service-block__announcement']}>
          <div className={styles['service-block__announcement--title']}>공지사항</div>
          <div className={styles['service-block__announcement--title--move']}>
            <Link to="/"><Move /></Link>
          </div>
        </div>
        <div className={styles['service-block__inquiry']}>
          <div className={styles['service-block__inquiry--title']}>문의하기</div>
          <div className={styles['service-block__inquiry--move']}>
            <Link to="/"><Move /></Link>
          </div>
        </div>
        <div className={styles['service-block__app-version']}>
          <div className={styles['service-block__app-version--title ']}>앱 버전</div>
          <div className={styles['service-block__app-version--imformation']}>
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

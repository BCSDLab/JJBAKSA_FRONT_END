import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from 'assets/svg/common/angle-braket.svg';
import styles from './Setting.module.scss';

export default function Setting(): JSX.Element {
  return (
    <div>
      <div className={styles['title-title']}>
        <Arrow className={styles.checkbox__icon} />
        {/* <div><Link to="/" className={styles['title__navigation--back']}>&lt;</Link></div> */}
        <div className={styles.title__Setting}>설정</div>
      </div>

      <div className={styles['account-setting']}>계정 관리</div>
      <div>
        <div><Link to="/idChange" className={styles['account-Setting__id--change']}>아이디 변경</Link></div>
        <div className={styles['id-id']}>fgnsdbcxb</div>

      </div>
      <div className={styles['password-whole']}>
        <div className={styles['account-Setting__password--change']}>비밀번호 변경 </div>
        <svg className={styles['account-Setting__password-change--Right-angle-braket']} width="9" height="17" viewBox="0 0 9 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L8 8.5L1 15.5" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div>
        <div className={styles['account-Setting__personal-information--manual']}>개인정보 이용방침</div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.33325 2.99967H2.99992C2.55789 2.99967 2.13397 3.17527 1.82141 3.48783C1.50885 3.80039 1.33325 4.22431 1.33325 4.66634V12.9997C1.33325 13.4417 1.50885 13.8656 1.82141 14.1782C2.13397 14.4907 2.55789 14.6663 2.99992 14.6663H11.3333C11.7753 14.6663 12.1992 14.4907 12.5118 14.1782C12.8243 13.8656 12.9999 13.4417 12.9999 12.9997V9.66634M9.66659 1.33301H14.6666M14.6666 1.33301V6.33301M14.6666 1.33301L6.33325 9.66634" stroke="#979797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className={styles['service-block']}>서비스</div>
      <div>
        <div className={styles['service-block__announcement']}>공지사항</div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.33325 2.99967H2.99992C2.55789 2.99967 2.13397 3.17527 1.82141 3.48783C1.50885 3.80039 1.33325 4.22431 1.33325 4.66634V12.9997C1.33325 13.4417 1.50885 13.8656 1.82141 14.1782C2.13397 14.4907 2.55789 14.6663 2.99992 14.6663H11.3333C11.7753 14.6663 12.1992 14.4907 12.5118 14.1782C12.8243 13.8656 12.9999 13.4417 12.9999 12.9997V9.66634M9.66659 1.33301H14.6666M14.6666 1.33301V6.33301M14.6666 1.33301L6.33325 9.66634" stroke="#979797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <div className={styles['service-block__inquiry']}>문의하기</div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.33325 2.99967H2.99992C2.55789 2.99967 2.13397 3.17527 1.82141 3.48783C1.50885 3.80039 1.33325 4.22431 1.33325 4.66634V12.9997C1.33325 13.4417 1.50885 13.8656 1.82141 14.1782C2.13397 14.4907 2.55789 14.6663 2.99992 14.6663H11.3333C11.7753 14.6663 12.1992 14.4907 12.5118 14.1782C12.8243 13.8656 12.9999 13.4417 12.9999 12.9997V9.66634M9.66659 1.33301H14.6666M14.6666 1.33301V6.33301M14.6666 1.33301L6.33325 9.66634" stroke="#979797" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className={styles['service-block__app-version']}>앱 버전</div>
      <div className={styles['bottom__log-out']}>로그아웃</div>
      <div className={styles['bottom__delete-account']}>탈퇴하기</div>
    </div>
  );
}

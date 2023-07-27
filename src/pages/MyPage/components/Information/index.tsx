import defaultImage from 'assets/images/follow/default-image.png';
// import fixPencil from 'assets/images/mypage/pencil.svg';
import option from 'assets/images/mypage/option.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './Information.module.scss';

export default function Information() {
  const { isMobile } = useMediaQuery();
  return (
    <div className={styles.information}>
      <div className={styles.user}>
        <div className={styles.profile}>
          <img src={defaultImage} alt="profileImage" className={styles.user__image} />
          {/* <img src={fixPencil} alt="changeProfile" className={styles['change--image']} /> */}
        </div>
        <div>
          <span className={styles.user__nickname}>
            닉네임
          </span>
          {isMobile && (
          <>
            <div className={styles.dot} />
            <span className={styles['totals__follower--number']}>팔로워 120</span>
          </>
          )}
          <span className={styles.user__account}>abcdIdentifier</span>
        </div>
      </div>
      {!isMobile && (
      <div className={styles.totals}>
        <div className={styles.totals__post}>
          <span className={styles['totals__post--number']}>11</span>
          <span className={styles['totals__post--label']}>게시물</span>
        </div>
        <div className={styles.totals__follower}>
          <span className={styles['totals__follower--number']}>22</span>
          <span className={styles['totals__follower--label']}>팔로워</span>
        </div>
      </div>
      )}
      {isMobile && <img src={option} alt="option" className={styles.option} />}

    </div>
  );
}

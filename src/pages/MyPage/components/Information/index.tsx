import defaultImage from 'assets/images/follow/default-image.png';
// import fixPencil from 'assets/images/mypage/pencil.svg';
import option from 'assets/svg/mypage/option.svg';
import useMyProfile from 'pages/MyPage/hooks/useMyProfile';
import styles from './Information.module.scss';

interface InformationProps {
  openModal:(url:string | undefined) => void
}

export default function Information({ openModal }:InformationProps) {
  const { profile } = useMyProfile();

  return (
    <div className={styles.information}>
      <div className={styles.user}>
        <button type="button" className={styles.profile} onClick={() => openModal(profile?.profileImage?.url)}>
          <img src={profile?.profileImage ? profile.profileImage.url : defaultImage} alt="profileImage" className={styles.user__image} />
          {/* <img src={fixPencil} alt="changeProfile" className={styles['change--image']} /> */}
        </button>
        <div>
          <span className={styles.user__nickname}>
            {profile?.nickname}
          </span>
          <div className={styles.dot} />
          <span className={styles['totals__follower--number']}>팔로워 120</span>
          <span className={styles.user__account}>{profile?.account}</span>
        </div>
      </div>
      <img src={option} alt="option" className={styles.option} />
    </div>
  );
}

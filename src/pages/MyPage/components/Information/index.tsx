import defaultImage from 'assets/images/follow/default-image.png';
import option from 'assets/svg/mypage/option.svg';
import { Link } from 'react-router-dom';
import { User } from 'api/user/entity';
import styles from './Information.module.scss';

type Profile = User & {
  profileImage?: {
    url: string
  },
};
interface InformationProps {
  openModal: (url: string | undefined) => void,
  profile: Profile
  followerNumber?: number

}

export default function Information({ openModal, followerNumber, profile }: InformationProps) {
  return (
    <div className={styles.information}>
      <div className={styles.user}>
        <button type="button" className={styles.profile} onClick={() => openModal(profile.profileImage?.url)}>
          <img src={profile.profileImage ? profile.profileImage.url : defaultImage} alt="profileImage" className={styles.user__image} />
        </button>
        <div>
          <span className={styles.user__nickname}>
            {profile?.nickname}
          </span>
          <div className={styles.dot} />
          <span className={styles['totals__follower--number']}>
            {`팔로워 ${followerNumber}`}
          </span>
          <span className={styles.user__account}>{`@${profile?.account}`}</span>
        </div>
      </div>
      <Link to="/setting">
        <img src={option} alt="option" className={styles.option} />
      </Link>
    </div>
  );
}

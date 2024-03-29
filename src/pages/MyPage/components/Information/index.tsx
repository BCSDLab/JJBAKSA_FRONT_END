import { Link, useNavigate } from 'react-router-dom';

import { User } from 'api/user/entity';
import defaultImage from 'assets/images/follow/default-image.png';
import { ReactComponent as Pencil } from 'assets/svg/common/pencil.svg';
import option from 'assets/svg/mypage/option.svg';

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
  const navigate = useNavigate();
  return (
    <div className={styles.information}>
      <div className={styles.user}>
        <button type="button" className={styles.profile} onClick={() => openModal(profile.profileImage?.url)}>
          <img src={profile.profileImage ? profile.profileImage.url : defaultImage} alt="profileImage" className={styles.user__image} />
          <div className={styles.profile__pencil}>
            <Pencil />
          </div>
        </button>
        <div>
          <span className={styles.user__nickname}>
            {profile?.nickname}
          </span>
          <div className={styles.dot} />
          <button
            className={styles['totals__follower--number']}
            type="button"
            onClick={() => navigate('/friend-list')}
          >
            {`팔로워 ${followerNumber}`}
          </button>
          <span className={styles.user__account}>{`@${profile?.account}`}</span>
        </div>
      </div>
      <Link to="/setting">
        <img src={option} alt="option" className={styles.option} />
      </Link>
    </div>
  );
}

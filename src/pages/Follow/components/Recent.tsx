import defaultImage from 'assets/images/follow/default-image.png';

import styles from './Recent.module.scss';

interface Props {
  nickname: string;
  profileImage?: {
    url: string
  }
}

export default function Recent({ nickname, profileImage }: Props) {
  return (
    <div className={styles.person}>
      <img
        src={profileImage?.url ?? defaultImage}
        alt={nickname}
        className={styles.person__profile}
      />
      <span className={styles.person__nickname}>{nickname}</span>
    </div>
  );
}

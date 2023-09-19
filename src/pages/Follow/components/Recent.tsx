import defaultImage from 'assets/images/follow/default-image.png';
import style from './Recent.module.scss';

interface Props {
  nickname: string;
}

export default function Recent({ nickname }: Props) {
  return (
    <div className={style.person}>
      <img src={defaultImage} alt={nickname} className={style.person__profile} />
      <span className={style.person__nickname}>{nickname}</span>
    </div>
  );
}

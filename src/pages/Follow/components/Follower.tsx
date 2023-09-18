import defaultImage from 'assets/images/follow/default-image.png';
import cn from 'utils/ts/classNames';
import { ReactComponent as Unfollow } from 'assets/svg/follow/user-remove.svg';
import { ReactComponent as Follow } from 'assets/svg/follow/user-add.svg';
import { useNavigate } from 'react-router-dom';
import style from './Follower.module.scss';
import useRequestAndUpdate from '../hooks/useRequestAndUpdate';
import useAcceptFollow from '../hooks/useAcceptFollow';
import useDeleteFollow from '../hooks/useDeleteFollow';
import useCancelFollow from '../hooks/useCancelFollow';

interface Props {
  account: string,
  nickname: string,
  followedType: string,
  id: number,
  requestId?: number,
}

export default function Follower({
  nickname, account, followedType, id, requestId,
}: Props) {
  const request = useRequestAndUpdate();
  const accept = useAcceptFollow();
  const { del } = useDeleteFollow();
  const cancel = useCancelFollow();
  const navigate = useNavigate();
  return (
    <div className={style.follower} id={`${id}`}>
      <img className={style.follower__image} src={defaultImage} alt="default" />
      <div className={style.follower__content}>
        <button
          type="button"
          className={cn({ [style['follower__content--nickname']]: true })}
          onClick={() => followedType === 'FOLLOWED' && navigate(`${id}`, {
            state: {
              followId: id,
              nickname,
              account,
              followedType,
            },
          })}
        >
          {nickname}
        </button>
        <p>
          @
          {account}
        </p>
      </div>
      <button
        className={cn({
          [style.follower__button]: followedType === 'NONE' || followedType === 'FOLLOWED',
          [style['follower__button--cancel']]: followedType === 'REQUEST_SENT',
          [style['follower__button--accept']]: followedType === 'REQUEST_RECEIVE',
        })}
        type="button"
        onClick={
          () => (followedType === 'NONE' && request(account))
            || (followedType === 'REQUEST_RECEIVE' && requestId && accept(requestId))
            || (followedType === 'FOLLOWED' && del(account))
            || (followedType === 'REQUEST_SENT' && requestId && cancel(requestId))
        }
      >
        {followedType === 'NONE' && <Follow />}
        {followedType === 'REQUEST_SENT' && '신청 취소'}
        {followedType === 'FOLLOWED' && <Unfollow />}
        {followedType === 'REQUEST_RECEIVE' && '친구 수락'}
      </button>
    </div>
  );
}

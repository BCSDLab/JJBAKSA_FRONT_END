import defaultImage from 'assets/images/follow/default-image.png';
import cn from 'utils/ts/classNames';
import { useNavigate } from 'react-router-dom';
import style from './Follower.module.scss';
import useRequestAndUpdate from '../hooks/useRequestAndUpdate';
import useAcceptFollow from '../hooks/useAcceptFollow';
import useDeleteFollow from '../hooks/useDeleteFollow';
import useCancelFollow from '../hooks/useCancelFollow';
import useRejectRequest from '../hooks/useRejectRequest';
import MobileUnfollow from './MobileUnfollow';

interface Props {
  account: string,
  nickname: string,
  followedType: string,
  id: number,
  requestId?: number,
  userCountResponse?: {
    id: number;
    reviewCount: number;
    friendCount: number;
  }
}

export default function Follower({
  nickname, account, followedType, id, requestId, userCountResponse,
}: Props) {
  const request = useRequestAndUpdate();
  const accept = useAcceptFollow();
  const {
    del, isMobile, mobileUnfollow, value, toggle,
  } = useDeleteFollow();
  const cancel = useCancelFollow();
  const reject = useRejectRequest();
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
              userCountResponse,
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
          [style.follower__button]: followedType === 'FOLLOWED',
          [style['follower__button--cancel']]: followedType === 'REQUEST_SENT',
          [style['follower__button--accept']]: followedType === 'REQUEST_RECEIVE',
          [style['follower__button--request']]: followedType === 'NONE',
        })}
        type="button"
        onClick={
          () => (followedType === 'NONE' && request(account))
            || (followedType === 'REQUEST_RECEIVE' && requestId && accept(requestId))
            || (followedType === 'FOLLOWED' && (isMobile ? mobileUnfollow() : del(account)))
            || (followedType === 'REQUEST_SENT' && requestId && cancel(requestId))
        }
      >
        {followedType === 'NONE' && '팔로우'}
        {followedType === 'REQUEST_SENT' && '요청됨'}
        {followedType === 'FOLLOWED' && '팔로잉'}
        {followedType === 'REQUEST_RECEIVE' && '확인'}
      </button>
      {followedType === 'REQUEST_RECEIVE' && requestId && (
      <button
        type="button"
        className={style.follower__button}
        onClick={() => reject(requestId)}
      >
        거절
      </button>
      )}
      {value && <MobileUnfollow nickname={nickname} del={del} toggle={toggle} account={account} />}
    </div>
  );
}

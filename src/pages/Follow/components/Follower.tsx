import defaultImage from 'assets/images/follow/default-image.png';
import cn from 'utils/ts/classNames';
import { useNavigate } from 'react-router-dom';
import styles from './Follower.module.scss';
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
  const buttonConfigs: {
    [key: string]:
    {
      className: string;
      onClick: () => void;
      text: string;
    }
  } = {
    NONE: {
      className: styles['follower__button--request'],
      onClick: () => account && request(account),
      text: '팔로우',
    },
    REQUEST_SENT: {
      className: styles['follower__button--cancel'],
      onClick: () => requestId && cancel(requestId),
      text: '요청됨',
    },
    FOLLOWED: {
      className: styles.follower__button,
      onClick: () => (isMobile ? mobileUnfollow() : del(account)),
      text: '팔로잉',
    },
    REQUEST_RECEIVE: {
      className: styles['follower__button--accept'],
      onClick: () => requestId && accept(requestId),
      text: '확인',
    },
  };
  const config = buttonConfigs[followedType];

  return (
    <div className={styles.follower} id={`${id}`}>
      <img className={styles.follower__image} src={defaultImage} alt="default" />
      <div className={styles.follower__content}>
        <button
          type="button"
          className={cn({ [styles['follower__content--nickname']]: true })}
          onClick={() => followedType === 'FOLLOWED' && navigate(`${id}`, {
            state: {
              id,
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
          [config.className]: true,
        })}
        type="button"
        onClick={config.onClick}
      >
        {config.text}
      </button>
      {followedType === 'REQUEST_RECEIVE' && requestId && (
      <button
        type="button"
        className={styles.follower__button}
        onClick={() => reject(requestId)}
      >
        거절
      </button>
      )}
      {value && isMobile
      && <MobileUnfollow nickname={nickname} del={del} toggle={toggle} account={account} />}
    </div>
  );
}

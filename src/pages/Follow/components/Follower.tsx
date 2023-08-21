import defaultImage from 'assets/images/follow/default-image.png';
import cn from 'utils/ts/classNames';
import {
  acceptFollow, cancleFollow, deleteFollow, requestFollow,
} from 'api/follow';
import { useMutation, useQueryClient } from 'react-query';
import { ReactComponent as Unfollow } from 'assets/svg/follow/user-remove.svg';
import { ReactComponent as Follow } from 'assets/svg/follow/user-add.svg';
import style from './Follower.module.scss';

// 팔로우 요청 후 유저 목록을 다시 받아와 요청중 상태로 변경
const useRequestAndUpdate = () => {
  const queryClient = useQueryClient();
  const { mutate: request } = useMutation('request', (account: string) => requestFollow({ userAccount: account }), {
    onSuccess: () => {
      queryClient.invalidateQueries('sended');
      queryClient.invalidateQueries('search');
    },
  });
  return request;
};

// 팔로우 승인 후 받은 요청 목록을 다시 받아와 갱신
const useAcceptFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: accept } = useMutation('accept', (id: number) => acceptFollow({ id }), {
    onSuccess: () => {
      queryClient.invalidateQueries('received');
      queryClient.invalidateQueries('follower');
    },
  });
  return accept;
};
const useDeleteFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: del } = useMutation('delete', (account: string) => deleteFollow({ userAccount: account }), {
    onSuccess: () => {
      queryClient.invalidateQueries('follower');
    },
  });

  return del;
};

const useCancleFollow = () => {
  const queryClient = useQueryClient();
  const { mutate: cancle } = useMutation('cancel', (id: number) => cancleFollow({ id }), {
    onSuccess: () => {
      queryClient.invalidateQueries('sended');
    },
  });

  return cancle;
};

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
  const del = useDeleteFollow();
  const cancle = useCancleFollow();
  return (
    <div className={style.follower} id={`${id}`}>
      <img className={style.follower__image} src={defaultImage} alt="default" />
      <div className={style.follower__content}>
        <p className={cn({ [style['follower__content--font']]: true })}>{nickname}</p>
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
            || (followedType === 'REQUEST_SENT' && requestId && cancle(requestId))
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

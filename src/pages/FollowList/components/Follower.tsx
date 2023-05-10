import defaultImage from 'assets/images/follow/default-image.png';
import cn from 'utils/ts/classNames';
import { acceptFollow, requestFollow } from 'api/follow';
import { useMutation, useQueryClient } from 'react-query';
import style from './Follower.module.scss';
import { FollowerInfo } from '../static/entity';

// 팔로우 요청 후 유저 목록을 다시 받아와 요청중 상태로 변경
const useRequestAndUpdate = () => {
  const queryClient = useQueryClient();
  const { mutate: request } = useMutation('request', (account: string) => requestFollow({ userAccount: account }), {
    onSuccess: () => {
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
    },
  });
  return { accept };
};

export default function Follower({
  nickname, account, followedType, id,
}: FollowerInfo) {
  const request = useRequestAndUpdate();
  const { accept } = useAcceptFollow();

  return (
    <div className={style.follower}>
      <img className={style.follower__image} src={defaultImage} alt="default" />
      <div className={style.follower__content}>
        <p className={cn({ [style['follower__content--font']]: true })}>{nickname}</p>
        <p>{account}</p>
      </div>
      <button
        className={cn({
          [style.follower__button]: followedType === 'NONE' || followedType === 'RECEIVED',
          [style['follower__button--unfollow']]: followedType === 'REQUESTED' || followedType === 'FOLLOWED',
        })}
        type="button"
        onClick={() => (followedType === 'NONE' && request(account)) || (followedType === 'RECEIVED' && id && accept(id))}
      >
        {followedType === 'NONE' && '팔로우'}
        {followedType === 'REQUESTED' && '요청중'}
        {followedType === 'FOLLOWED' && '언팔로우'}
        {followedType === 'RECEIVED' && '팔로우'}
      </button>
    </div>
  );
}

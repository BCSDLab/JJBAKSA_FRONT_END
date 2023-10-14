import defaultImage from 'assets/images/follow/default-image.png';
import { useEffect, useState } from 'react';
import cn from 'utils/ts/classNames';
import { useLocation } from 'react-router-dom';
import style from './FollowProfile.module.scss';
import FollowReview from './FollowReview';
import useDeleteFollow from '../hooks/useDeleteFollow';
import useRequestAndUpdate from '../hooks/useRequestAndUpdate';
import useGetFollowerReview from '../hooks/useGetFollowerReview';
import useGetFollowerReviewCount from '../hooks/useGetFollowerReviewCount';

const useDeleteState = () => {
  const [canDelete, setCanDelete] = useState(true);
  const { del, data: deletedUser } = useDeleteFollow();

  useEffect(() => {
    if (deletedUser && deletedUser.status >= 200 && deletedUser.status <= 299) {
      setCanDelete((prev) => !prev);
    }
  }, [deletedUser]);

  return { del, canDelete, deletedUser };
};

export default function FollowProfile() {
  const location = useLocation();
  const state = location.state as {
    followId: number,
    nickname: string,
    account: string,
    followedType: string
    userCountResponse: {
      id: number;
      reviewCount: number;
      friendCount: number;
    }
  };
  const { data } = useGetFollowerReview(state.followId);
  const { del, canDelete } = useDeleteState();
  const request = useRequestAndUpdate();
  const reviewCount = useGetFollowerReviewCount(state.followId);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.top__container}>
          <div className={style.user}>
            <img alt="img" src={defaultImage} className={style.user__profile} />
            <div className={style.user__info}>
              <div>
                <span className={cn({ [style['user__info--span']]: true })}>{state.nickname}</span>
              </div>
              <div>
                @
                {state.account}
              </div>
            </div>
            <button
              type="button"
              className={style.user__button}
              onClick={() => (canDelete && del(state.account))
                || (!canDelete && request(state.account))}
            >
              {canDelete
                ? '팔로잉'
                : '팔로우'}
            </button>
          </div>
          <div className={style.user__count}>
            <div>
              <div className={cn({ [style['user__count--font']]: true })}>{state.userCountResponse.reviewCount}</div>
              <div>게시물</div>
            </div>
            <div>
              <div className={cn({ [style['user__count--font']]: true })}>{state.userCountResponse.friendCount}</div>
              <div>팔로워</div>
            </div>
          </div>
        </div>
        <div className={style.set}>리뷰</div>
      </div>
      <div className={style.count}>
        총
        {' '}
        {reviewCount && reviewCount.data.count}
        {' '}
        개의 리뷰
      </div>
      <div className={style.content}>
        <div className={style.review__list}>
          {data && data.content.map(
            (item) => (
              <FollowReview
                key={item.shopId}
                placeId={item.placeId}
                name={item.name}
                category={item.category}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

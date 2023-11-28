import defaultImage from 'assets/images/follow/default-image.png';
import { useEffect, useState } from 'react';
import cn from 'utils/ts/classNames';
import { useLocation } from 'react-router-dom';
import { User } from 'api/user/entity';
import styles from './FollowProfile.module.scss';
import FollowReview from './FollowReview';
import useDeleteFollow from '../hooks/useDeleteFollow';
import useRequestAndUpdate from '../hooks/useRequestAndUpdate';
import useGetFollowerReview from '../hooks/useGetFollowerReview';
import useGetFollowerReviewCount from '../hooks/useGetFollowerReviewCount';

const useDeleteState = () => {
  const [isFollowed, setIsFollowed] = useState(true);
  const { del, data: deletedUser } = useDeleteFollow();

  useEffect(() => {
    if (deletedUser && deletedUser.status >= 200 && deletedUser.status <= 299) {
      setIsFollowed((prev) => !prev);
    }
  }, [deletedUser]);

  return { del, isFollowed, deletedUser };
};

export default function FollowProfile() {
  const location = useLocation();
  const {
    nickname, account, userCountResponse, id,
  } = location.state as User;
  const { data } = useGetFollowerReview(id);
  const { del, isFollowed } = useDeleteState();
  const request = useRequestAndUpdate();
  const reviewCount = useGetFollowerReviewCount(id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.top__container}>
          <div className={styles.user}>
            <img alt="유저 프로필 이미지" src={defaultImage} className={styles.user__profile} />
            <div className={styles.user__info}>
              <div>
                <span className={cn({ [styles['user__info--span']]: true })}>{nickname}</span>
              </div>
              <div>
                @
                {account}
              </div>
            </div>
            <button
              type="button"
              className={styles.user__button}
              onClick={() => (isFollowed && del(account))
                || (!isFollowed && request(account))}
            >
              {isFollowed
                ? '팔로잉'
                : '팔로우'}
            </button>
          </div>
          <div className={styles.user__count}>
            <div>
              <div className={cn({ [styles['user__count--font']]: true })}>{userCountResponse.reviewCount}</div>
              <div>게시물</div>
            </div>
            <div>
              <div className={cn({ [styles['user__count--font']]: true })}>{userCountResponse.friendCount}</div>
              <div>팔로워</div>
            </div>
          </div>
        </div>
        <div className={styles.set}>리뷰</div>
      </div>
      <div className={styles.count}>
        총
        {' '}
        {reviewCount && reviewCount.data.count}
        {' '}
        개의 리뷰
      </div>
      <div className={styles.content}>
        <div className={styles.review__list}>
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

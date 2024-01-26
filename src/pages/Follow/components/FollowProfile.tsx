import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { User } from 'api/user/entity';
import defaultImage from 'assets/images/follow/default-image.png';
import FollowReview from 'pages/Follow/components/FollowReview';
import useDeleteFollow from 'pages/Follow/hooks/useDeleteFollow';
import useGetFollowerReview from 'pages/Follow/hooks/useGetFollowerReview';
import useGetFollowerReviewCount from 'pages/Follow/hooks/useGetFollowerReviewCount';
import useRequestAndUpdate from 'pages/Follow/hooks/useRequestAndUpdate';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './FollowProfile.module.scss';

const useDeleteState = () => {
  const [isFollowed, setIsFollowed] = useState(true);
  const { del, data: deletedUser } = useDeleteFollow();

  useEffect(() => {
    if (deletedUser && deletedUser.status >= 200 && deletedUser.status <= 299) {
      setIsFollowed((prev) => !prev);
    }
  }, [deletedUser]);

  return {
    del, isFollowed, deletedUser, setIsFollowed,
  };
};

export default function FollowProfile() {
  const location = useLocation();
  const {
    nickname, account, userCountResponse, id, profileImage,
  } = location.state as User;
  const { data } = useGetFollowerReview(id);
  const { del, isFollowed, setIsFollowed } = useDeleteState();
  const request = useRequestAndUpdate(account);
  const reviewCount = useGetFollowerReviewCount(id);
  const { isMobile } = useMediaQuery();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.top__container}>
          <div className={styles.user}>
            <img alt="유저 프로필 이미지" src={profileImage?.url ?? defaultImage} className={styles.user__profile} />
            <div className={styles.user__info}>
              <div className={styles.user__set}>
                <span className={cn({ [styles['user__info--span']]: true })}>{nickname}</span>
                {isMobile && <span>팔로워 {userCountResponse.friendCount}</span>}
              </div>
              <div>
                @
                {account}
              </div>
            </div>
            <button
              type="button"
              className={cn({
                [styles.user__button]: isFollowed,
                [styles['user__button--unfollow']]: !isFollowed,
              })}
              onClick={() => {
                if (isFollowed) {
                  del(account);
                } else {
                  setIsFollowed(true);
                  request();
                }
              }}
            >
              {isFollowed
                ? '팔로잉'
                : '팔로우'}
            </button>
          </div>
          {!isMobile
            && (
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
            )}
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
                key={item.id}
                placeId={item.placeId}
                name={item.name}
                category={item.category}
                followerId={id}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

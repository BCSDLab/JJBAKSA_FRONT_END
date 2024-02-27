import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchFollowerReview, fetchMyReview } from 'api/review';
import defaultImage from 'assets/images/follow/default-image.png';
import { ReactComponent as FriendEmptyIcon } from 'assets/svg/home/friend-empty-review.svg';
import { ReactComponent as MyEmptyIcon } from 'assets/svg/home/my-empty-review.svg';
import { ReactComponent as SwitchIcon } from 'assets/svg/home/switch.svg';
import { ReactComponent as StarIcon } from 'assets/svg/post/star.svg';
import LoadingSpinner from 'components/common/LoadingSpinner';
import cn from 'utils/ts/classNames';

import styles from './ReviewList.module.scss';

export default function ReviewList({ placeId }: { placeId: string }) {
  const [type, setType] = useState('my');
  const [sortType, setSortType] = useState('createdAt');
  const { data: friendReview } = useQuery({
    queryKey: ['followerReviews', placeId, sortType],
    queryFn: () => fetchFollowerReview({ placeId, sort: sortType }),
  });

  const { data: myReview } = useQuery({
    queryKey: ['myReviews', placeId, sortType],
    queryFn: () => fetchMyReview({ placeId, sort: sortType }),
  });

  if (friendReview && myReview) {
    return (
      <div className={styles.review}>
        <div className={styles['review-type']}>
          <button
            className={cn({
              [styles['review-type__button']]: true,
              [styles['review-type__button--active']]: type === 'my',
            })}
            onClick={() => setType('my')}
            type="button"
          >내 리뷰
          </button>
          <button
            className={cn({
              [styles['review-type__button']]: true,
              [styles['review-type__button--active']]: type === 'friend',
            })}
            onClick={() => setType('friend')}
            type="button"
          >친구 리뷰
          </button>
        </div>
        {type === 'my'
      && (
      <ul className={styles['review-data']}>
        {myReview?.data.content.length !== 0 && (
        <>
          <button
            className={styles['review-data__button']}
            type="button"
            onClick={() => setSortType(sortType === 'createdAt' ? 'rate' : 'createdAt')}
          >
            <SwitchIcon />{sortType === 'createdAt' ? '최신순' : '별점순'}
          </button>
          {myReview?.data.content.map((review) => (
            <li className={styles['review-data__my']} key={review.id}>
              <div>{review.content}</div>
              <div>
                {review.createdAt.replaceAll('-', '/').slice(3)} |{' '}
                <StarIcon fill="#FF7F23" width="18" height="18" />
                {review.rate}.0
              </div>
            </li>
          ))}
        </>
        )}
        {myReview?.data.content.length === 0 && (
          <div className={styles['review-data__empty']}>
            <div><MyEmptyIcon /></div>
            <div>오늘 다녀오셨나요?</div>
            <div>리뷰를 한 번 작성해 보아요!</div>
          </div>
        )}
      </ul>
      )}
        {type === 'friend' && (
        <ul className={styles['review-data']}>
          { friendReview?.data.content.length !== 0 && (
          <>
            <button
              className={styles['review-data__button']}
              type="button"
              onClick={() => setSortType(sortType === 'createdAt' ? 'rate' : 'createdAt')}
            >
              <SwitchIcon />{sortType === 'createdAt' ? '최신순' : '별점순'}
            </button>
            {friendReview?.data.content.map((review) => (
              <li className={styles['review-data__friend']} key={review.id}>
                <div className={styles['review-data__image']}>
                  <img
                    src={review.userReviewResponse?.profileImage?.url || defaultImage}
                    alt={`${review.userReviewResponse.nickname}의 프로필`}
                  />
                </div>
                <div className={styles['review-data__content']}>
                  <div>
                    <span>{review.userReviewResponse.nickname}</span>
                    <span>{review.userReviewResponse.account}</span>
                  </div>
                  <div>{review.content}</div>
                  <div>
                    {review.createdAt.replaceAll('-', '/').slice(3)}|
                    <StarIcon fill="#FF7F23" width="16" height="16" />
                    {review.rate}.0
                  </div>
                </div>
              </li>
            ))}
          </>
          )}
          {friendReview?.data.content.length === 0 && (
          <div className={styles['review-data__empty']}>
            <div>작성한 리뷰가 없어요</div>
            <div><FriendEmptyIcon /></div>
          </div>
          )}
        </ul>
        )}
      </div>
    );
  }

  return (
    <div className={styles.loading}>
      <LoadingSpinner size={100} />
    </div>
  );
}

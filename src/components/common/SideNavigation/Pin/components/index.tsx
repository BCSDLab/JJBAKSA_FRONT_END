import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchFollowerReview, fetchMyReview } from 'api/review';
import { ReactComponent as SwitchIcon } from 'assets/svg/home/switch.svg';
import { ReactComponent as StarIcon } from 'assets/svg/post/star.svg';
import cn from 'utils/ts/classNames';

import styles from './ReviewList.module.scss';

export default function ReviewList({ placeId }: { placeId: string }) {
  const [type, setType] = useState('my');
  const { data: friendReview } = useQuery({
    queryKey: ['followerReviews', placeId],
    queryFn: () => fetchFollowerReview(placeId),
  });

  const { data: myReview } = useQuery({
    queryKey: ['myReviews', placeId],
    queryFn: () => fetchMyReview(placeId),
  });
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
      <button className={styles['list-type']} type="button"><SwitchIcon />최신순</button>
      <ul className={styles['review-data']}>
        {type === 'my'
          && myReview?.data.content.map((review) => (
            <li className={styles['review-data__detail']} key={review.id}>
              <div>{review.content}</div>
              <div>{review.createdAt.replaceAll('-', '/').slice(3)} |<StarIcon fill="#FF7F23" width="18" height="18" />{review.rate}.0
              </div>
            </li>
          ))}
      </ul>
      <ul className={styles['review-data']}>
        {type === 'friend' && friendReview?.data.content.map((review) => (
          <li className={styles['review-data__detail']} key={review.id}>
            <div>{review.content}</div>
            <div>{review.createdAt.replaceAll('-', '/').slice(3)} | <StarIcon fill="#FF7F23" width="18" height="18" />{review.rate}.0</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';

import { fetchFollowerReview } from 'api/review';
import NotFoundDescription from 'pages/ShopDetail/components/NotFoundDescription/index';
import SectionHeader from 'pages/ShopDetail/components/SectionHeader/index';

import styles from './ReviewList.module.scss';
// import mockReviews from './mock';

interface Props {
  placeId: string;
}

function FriendReviewList({ placeId }: Props) {
  const { data } = useQuery({
    queryKey: ['followerReviews'],
    queryFn: () => fetchFollowerReview(placeId),
  });

  if (data) {
    const { content, totalElements, size } = data.data;

    return (
      <section className={styles['review-list']}>
        <SectionHeader
          title="친구의 리뷰"
          description={`총 ${totalElements}개의 리뷰`}
          button={totalElements > size ? { content: '전체보기', onClick: () => {} } : undefined}
        />

        {content.length ? (
          <ul className={styles['review-list__main']}>
            {content.slice(0, size).map(({ id, content: reviewContent, userReviewResponse }) => (
              <li key={id}>
                <img
                  alt={`${userReviewResponse.nickname}의 프로필`}
                  src={userReviewResponse?.profileImage?.url}
                />
                <div className={styles['review-list__main--follower-content']}>
                  <h3>{userReviewResponse.nickname}</h3>
                  <div>{reviewContent}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <NotFoundDescription />
        )}
      </section>
    );
  }

  return (
    <section className={styles['review-list']}>
      <SectionHeader title="친구의 리뷰" description="리뷰를 불러올 수 없습니다." />
      <NotFoundDescription />
    </section>
  );
}

export default FriendReviewList;

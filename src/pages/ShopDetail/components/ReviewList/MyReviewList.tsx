import { useQuery } from '@tanstack/react-query';

import { fetchMyReview } from 'api/review';
import defaultImage from 'assets/images/follow/default-image.png';
import NotFoundDescription from 'pages/ShopDetail/components/NotFoundDescription/index';
import SectionHeader from 'pages/ShopDetail/components/SectionHeader/index';

import styles from './ReviewList.module.scss';

interface Props {
  placeId: string;
}

function MyReviewList({ placeId }: Props) {
  const { data } = useQuery({
    queryKey: ['myReviews', placeId],
    queryFn: () => fetchMyReview({ placeId }),
  });
  if (data) {
    const { content } = data.data;

    return (
      <section className={styles['review-list']}>
        <SectionHeader
          title="나의 리뷰"
          description={
            content[0]
              ? `마지막 방문 ${(content[0].createdAt).replaceAll('-', '.')}`
              : '방문 기록이 없어요.'
          }
        />
        {content.length ? (
          <ul className={styles['review-list__main']}>
            {content.map(({ id, content: reviewContent, userReviewResponse }) => (
              <li key={id}>
                <img
                  alt={`${userReviewResponse.nickname}의 프로필`}
                  src={userReviewResponse?.profileImage?.url || defaultImage}
                />
                <div className={styles['review-list__main--my-content']}>
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
      <SectionHeader title="나의 리뷰" description="리뷰를 불러올 수 없습니다." />
      <NotFoundDescription />
    </section>
  );
}

export default MyReviewList;

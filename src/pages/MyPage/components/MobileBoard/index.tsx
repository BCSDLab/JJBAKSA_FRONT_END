import { Link } from 'react-router-dom';

import { Shop } from 'api/mypage/entity';
import notExist from 'assets/svg/mypage/not-exist.svg';
import filledStar from 'assets/svg/mypage/star-filled.svg';
import useMyProfile from 'pages/MyPage/hooks/useMyProfile';
import useReviwes from 'pages/MyPage/hooks/useReviews';

import styles from './MobileBoard.module.scss';

interface MobileBoardProps {
  posts: Array<Shop>,
}

interface ReviewProps {
  placeId: string,
  name: string,
  category: string
}

function Review({
  placeId, name, category,
}: ReviewProps) {
  const { reviews, isLoading } = useReviwes(placeId);
  return (
    <div className={styles.post}>
      <div className={styles.post__store}>
        <div className={styles.store}>
          <Link to={`/shop/${placeId}`} className={styles.post__link}>
            <span className={styles.store__name}>{name}</span>
            <span className={styles.store__type}>{category}</span>
          </Link>
        </div>
      </div>
      {!isLoading && reviews.map((review) => (
        <div key={review.id}>
          <p className={styles['review__main-text']}>{review.content}</p>
          <div className={styles.review__detail}>
            <span>{review.createdAt}</span>
            <span>|</span>
            <div className={styles['star-rate']}>
              <img src={filledStar} alt="rate" className={styles['star-rate__image']} />
              <span className={styles['star-rate__rate']}>
                {parseFloat(review.rate.toString()).toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MoileBoard({ posts }: MobileBoardProps) {
  const { getTotal } = useMyProfile();
  return (
    <div className={styles.board}>
      {posts ? (
        <>
          <span className={styles.total}>{`총 ${getTotal()}개의 리뷰`}</span>
          {posts.map((post) => (
            <div key={post.placeId}>
              <Review
                placeId={post.placeId}
                name={post.name}
                category={post.category}
              />
              <div className={styles.underline} />
            </div>
          ))}
        </>
      ) : (
        <div className={styles['not-exist']}>
          <span className={styles['not-exist__phrase']}>
            <p>등록된 리뷰가 없어요.</p>
            <p>다녀온 음식점의 리뷰를 작성해 보세요!</p>
          </span>
          <img src={notExist} alt="not-exist" className={styles['not-exist__image']} />
        </div>
      )}
    </div>
  );
}

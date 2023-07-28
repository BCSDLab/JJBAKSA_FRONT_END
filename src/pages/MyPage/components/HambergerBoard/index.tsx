import defaultImage from 'assets/images/search/default-image.png';
import star from 'assets/svg/mypage/star.svg';
import filledStar from 'assets/svg/mypage/star-filled.svg';
import styles from './HambergerBoard.module.scss';

type Post = {
  url: string
};

interface HambergerBoardProps {
  posts: Array<Post>
}

export default function HambergerBoard({ posts }:HambergerBoardProps) {
  return (
    <div className={styles.board}>
      {posts.map(() => (
        <div className={styles.post}>
          <img src={defaultImage} alt="post" className={styles.post__image} />
          <div>
            <div className={styles.post__detail}>
              <div>
                <span className={styles['post__detail--name']}>카페 마이야르 성수점</span>
                <span className={styles['post__detail--date']}>00.00.00 작성</span>
              </div>
              <div className={styles['star-rate']}>
                <img src={filledStar} alt="score" className={styles['star-rate__star']} />
                <img src={filledStar} alt="score" className={styles['star-rate__star']} />
                <img src={filledStar} alt="score" className={styles['star-rate__star']} />
                <img src={filledStar} alt="score" className={styles['star-rate__star']} />
                <img src={star} alt="score" className={styles['star-rate__star']} />
              </div>
            </div>
            <p className={styles['post__main-text']}>
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글글
              글글글글글글글글글글글글글글글글글글글글글

            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

import filledStar from 'assets/svg/mypage/star-filled.svg';
import openArrow from 'assets/svg/mypage/open-arrow.svg';
import closeArrow from 'assets/svg/mypage/close-arrow.svg';
import { useState } from 'react';
import styles from './MobileBoard.module.scss';

type Post = {
  url: string
};

interface MobileBoardProps {
  posts: Array<Post>
}
function Review() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={styles.post}>
      <div className={styles.post__store}>
        <div className={styles.store}>
          <span className={styles.store__name}>국밥 공을기</span>
          <span className={styles.store__type}>중식당</span>
        </div>
        <button type="button" onClick={() => setOpen(!isOpen)} className={styles.post__opener}>
          <img src={isOpen ? closeArrow : openArrow} alt="post-opener" />
        </button>
      </div>
      {isOpen && (
      <div>
        <p className={styles['review__main-text']}>두번째 방문인데 여전히 학교 주변에 숨겨진 맛집. 주인 아주머니가 친절하시고 가격도 싸다. 자주 방문할 것 같다.두번째 방문인데 여전히 학교 주변에 숨겨진 맛집. 주인 아주머니가 친절하시고 가격도 싸다. 자주 방문할 것 같다.</p>
        <div className={styles.review__detail}>
          <span>02/22</span>
          <span>|</span>
          <div className={styles['star-rate']}>
            <img src={filledStar} alt="rate" className={styles['star-rate__image']} />
            <span className={styles['star-rate__rate']}>4.0</span>
          </div>
        </div>
      </div>
      )}

    </div>
  );
}

export default function MoileBoard({ posts }:MobileBoardProps) {
  return (
    <div className={styles.board}>
      <span className={styles.total}>총 120개의 리뷰</span>
      {posts.map(() => (
        <>
          <Review />
          <div className={styles.underline} />
        </>
      ))}
    </div>
  );
}

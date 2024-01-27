import notExist from 'assets/svg/mypage/not-exist.svg';
import MobileBoard from 'pages/MyPage/components/MobileBoard/index';
import useReviwedShops from 'pages/MyPage/hooks/useReviewedShops';

import styles from './MyPost.module.scss';

export default function MyPost() {
  const { shops } = useReviwedShops();

  if (shops.length <= 0) {
    return (
      <div className={styles['not-exist']}>
        <span className={styles['not-exist__phrase']}>
          <p>등록된 리뷰가 없어요.</p>
          <p>다녀온 음식점의 리뷰를 작성해 보세요!</p>
        </span>
        <img src={notExist} alt="not-exist" className={styles['not-exist__image']} />
      </div>
    );
  }

  return (
    <MobileBoard posts={shops} />
  );
}

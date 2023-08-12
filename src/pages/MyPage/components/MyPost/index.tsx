import notExist from 'assets/svg/mypage/not-exist.svg';
import useReviwedShops from 'pages/MyPage/hooks/useReviewedShops';
import styles from './MyPost.module.scss';
import MobileBoard from '../MobileBoard';

export default function MyPost() {
  const { isLoading, isError, shops } = useReviwedShops();
  return (
    <div>
      {!isLoading && !isError && shops?.length !== 0 ? (
        <MobileBoard posts={shops} />
      ) : (
        (
          <div className={styles['not-exist']}>
            <span className={styles['not-exist__phrase']}>
              <p>둥록된 리뷰가 없어요.</p>
              <p>다녀온 음식점의 리뷰를 작성해 보세요!</p>
            </span>
            <img src={notExist} alt="not-exist" className={styles['not-exist__image']} />
          </div>
        )
      )}

    </div>
  );
}

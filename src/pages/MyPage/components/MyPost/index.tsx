import { useState } from 'react';
import checkerboard from 'assets/svg/mypage/checkerboard.svg';
import filledCheckerboard from 'assets/svg/mypage/checkerboard-filled.svg';
import filledHamberger from 'assets/svg/mypage/hamberger-filled.svg';
import hamberger from 'assets/svg/mypage/hamberger.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import notExist from 'assets/svg/mypage/not-exist.svg';
import useReviwedShops from 'pages/MyPage/hooks/useReviewedShops';
import styles from './MyPost.module.scss';
import CheckerBoard from '../Checkerboard';
import DUMMY from './dummy';
import HambergerBoard from '../HambergerBoard';
import MobileBoard from '../MobileBoard';

export default function MyPost() {
  const [viewType, setType] = useState('CHECKERBOARD');
  const { isLoading, isError, shops } = useReviwedShops();
  console.log(isLoading, isError, shops);
  const { isMobile } = useMediaQuery();
  return (
    <div>
      {!isLoading && !isError && shops?.length !== 0 ? (
        <>
          <div className={styles['view-options']}>
            <button type="button" onClick={() => setType('CHECKERBOARD')} className={styles['view-options__option']}>
              <img src={viewType === 'CHECKERBOARD' ? filledCheckerboard : checkerboard} alt="checkerboard" />
            </button>
            <button type="button" onClick={() => setType('HAMBERGER')} className={styles['view-options__option']}>
              <img src={viewType === 'HAMBERGER' ? filledHamberger : hamberger} alt="checkerboard" />
            </button>
          </div>
          {!isMobile && viewType === 'CHECKERBOARD' && <CheckerBoard posts={DUMMY} />}
          {!isMobile && viewType === 'HAMBERGER' && <HambergerBoard posts={DUMMY} />}
          {isMobile && <MobileBoard posts={shops} />}
        </>
      ) : (
        !isMobile
        && (
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

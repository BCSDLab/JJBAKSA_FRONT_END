import { useState } from 'react';
import checkerboard from 'assets/svg/mypage/checkerboard.svg';
import filledCheckerboard from 'assets/svg/mypage/checkerboard-filled.svg';
import filledHamberger from 'assets/svg/mypage/hamberger-filled.svg';
import hamberger from 'assets/svg/mypage/hamberger.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from './MyPost.module.scss';
import CheckerBoard from '../Checkerboard';
import DUMMY from './dummy';
import HambergerBoard from '../HambergerBoard';
import MobileBoard from '../MobileBoard';

export default function MyPost() {
  const [viewType, setType] = useState('CHECKERBOARD');
  const { isMobile } = useMediaQuery();
  return (
    <div>
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
      {isMobile && <MobileBoard posts={DUMMY} />}
    </div>
  );
}

import BottomNavigation from 'components/common/BottomNavigation';
import TopNavigation from 'components/common/TopNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useState } from 'react';
import Information from './components/Information';
import BoardSelector from './components/BoardSelector';
import MyWrite from './components/MyWrite';
import BookMark from './components/BookMark';
import style from './MyPage.module.scss';

export default function MyPage() {
  const { isMobile } = useMediaQuery();
  const [board, setBoard] = useState('MYWRITE');
  return (
    <>
      {!isMobile && <TopNavigation />}
      <div className={style['my-page']}>
        <Information />
        <BoardSelector setBoard={setBoard} />
        {board === 'MYWRITE' && <MyWrite />}
        {board === 'BOOKMARK' && <BookMark />}
      </div>
      {isMobile && <BottomNavigation />}
    </>
  );
}

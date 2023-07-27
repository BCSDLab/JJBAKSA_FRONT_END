import BottomNavigation from 'components/common/BottomNavigation';
import TopNavigation from 'components/common/TopNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useState } from 'react';
import Information from './components/Information';
import BoardSelector from './components/BoardSelector';
import BookMark from './components/BookMark';
import style from './MyPage.module.scss';
import MyPost from './components/MyPost';

export default function MyPage() {
  const { isMobile } = useMediaQuery();
  const [board, setBoard] = useState('MYPOST');
  return (
    <>
      {!isMobile && <TopNavigation />}
      <div className={style['my-page']}>
        <Information />
        <BoardSelector setBoard={setBoard} board={board} />
        {board === 'MYPOST' && <MyPost />}
        {board === 'BOOKMARK' && <BookMark />}
      </div>
      {isMobile && <BottomNavigation />}
    </>
  );
}

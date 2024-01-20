import { Suspense, useState } from 'react';
import { toast } from 'react-toastify';

import BottomNavigation from 'components/common/BottomNavigation';
import LoadingSpinner from 'components/common/LoadingSpinner';
import SideNavigation from 'components/common/SideNavigation';
import BoardSelector from 'pages/MyPage/components/BoardSelector/index';
import BookMark from 'pages/MyPage/components/BookMark/index';
import Information from 'pages/MyPage/components/Information/index';
import MyPost from 'pages/MyPage/components/MyPost/index';
import ProfileModal from 'pages/MyPage/components/ProfileModal/index';
import useMyProfile from 'pages/MyPage/hooks/useMyProfile';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './MyPage.module.scss';

export default function MyPage() {
  const { isMobile } = useMediaQuery();
  const [board, setBoard] = useState('MYPOST');
  const [isOpen, setOpen] = useState(false);
  const { profile, followerNumber } = useMyProfile();

  const openModal = (url:string | undefined) => {
    setOpen(true);
    toast(<ProfileModal imgUrl={url} nickname={profile?.nickname} />, {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      onClose: () => setOpen(false),
      className: styles['bottom-sheet'],
    });
  };
  return (
    <>
      {!isMobile && <SideNavigation />}
      {profile && (
      <div className={styles['my-page']}>
        <Information openModal={openModal} profile={profile} followerNumber={followerNumber} />
        <BoardSelector setBoard={setBoard} board={board} />
        <Suspense fallback={<LoadingSpinner size={100} />}>
          {board === 'MYPOST' && <MyPost />}
        </Suspense>
        {board === 'BOOKMARK' && <BookMark />}
      </div>
      )}
      {isMobile && <BottomNavigation />}
      {isOpen && <div className={styles['modal-overlay']} />}
    </>
  );
}

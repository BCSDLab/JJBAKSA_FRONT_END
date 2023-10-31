import BottomNavigation from 'components/common/BottomNavigation';
import SideNavigation from 'components/common/SideNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Information from './components/Information';
import BoardSelector from './components/BoardSelector';
import BookMark from './components/BookMark';
import styles from './MyPage.module.scss';
import MyPost from './components/MyPost';
import ProfileModal from './components/ProfileModal';
import useMyProfile from './hooks/useMyProfile';

export default function MyPage() {
  const { isMobile } = useMediaQuery();
  const [board, setBoard] = useState('MYPOST');
  const [isOpen, setOpen] = useState(false);
  const { profile, followerNumber } = useMyProfile();

  const openModal = (url:string | undefined) => {
    setOpen(true);
    toast(<ProfileModal imgUrl={url} nickname={profile?.nickname} />, {
      position: 'bottom-center',
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
      {!isMobile && <SideNavigation selected={undefined} placeId="" />}
      {profile && (
      <div className={styles['my-page']}>
        <Information openModal={openModal} profile={profile} followerNumber={followerNumber} />
        <BoardSelector setBoard={setBoard} board={board} />
        {board === 'MYPOST' && <MyPost />}
        {board === 'BOOKMARK' && <BookMark />}
      </div>
      )}
      {isMobile && <BottomNavigation />}
      {isOpen && <div className={styles['modal-overlay']} />}
    </>
  );
}

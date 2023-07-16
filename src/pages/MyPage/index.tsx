import BottomNavigation from 'components/common/BottomNavigation';
import TopNavigation from 'components/common/TopNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';

export default function MyPage() {
  const { isMobile } = useMediaQuery();
  return (
    <>
      {!isMobile && <TopNavigation />}
      <div>마이페이지</div>
      {isMobile && <BottomNavigation />}
    </>
  );
}

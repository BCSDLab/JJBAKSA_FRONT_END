import { Outlet } from 'react-router-dom';
import BottomNavigation from 'components/common/BottomNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import TopNavigation from 'components/common/TopNavigation';

export default function DefaultLayout(): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <>
      {!isMobile && <TopNavigation />}
      <Outlet />
      {isMobile && <BottomNavigation />}
    </>
  );
}

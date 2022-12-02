import { ReactNode } from 'react';
import BottomNavigation from 'components/common/BottomNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import TopNavigation from 'components/common/TopNavigation';

interface DefaultLayoutProps {
  children: ReactNode
}

function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <>
      {!isMobile && <TopNavigation />}
      {children}
      {isMobile && <BottomNavigation />}
    </>
  );
}

export default DefaultLayout;

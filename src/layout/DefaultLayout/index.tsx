import { ReactNode } from 'react';
import BottomNavigation from 'components/common/BottomNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';

interface DefaultLayoutProps {
  children: ReactNode
}

function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <>
      {children}
      {isMobile && <BottomNavigation />}
    </>
  );
}

export default DefaultLayout;

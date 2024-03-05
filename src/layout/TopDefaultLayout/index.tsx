import { Outlet } from 'react-router-dom';

import TopNavigation from 'components/common/TopNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';

export default function TopDefaultLayout(): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <>
      {!isMobile && <TopNavigation />}
      <Outlet />
    </>
  );
}

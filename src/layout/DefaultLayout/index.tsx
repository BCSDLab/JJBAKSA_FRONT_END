import { Outlet } from 'react-router-dom';

import BottomNavigation from 'components/common/BottomNavigation';
import SideNavigation from 'components/common/SideNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './DefaultLayout.module.scss';

export default function DefaultLayout(): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <>
      {!isMobile && <span className={styles['sidebar-space']} />}
      {!isMobile && <SideNavigation />}
      <Outlet />
      {isMobile && <BottomNavigation />}
    </>
  );
}

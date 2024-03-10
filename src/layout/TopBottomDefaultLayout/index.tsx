import { Outlet } from 'react-router-dom';

import BottomNavigation from 'components/common/BottomNavigation';
import TopNavigation from 'components/common/TopNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './TopBottomDefaultLayout.module.scss';

export default function TopBottomDefaultLayout(): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <>
      {!isMobile && <TopNavigation />}
      <main className={styles.main}>
        <Outlet />
      </main>
      {isMobile && <BottomNavigation />}
    </>
  );
}

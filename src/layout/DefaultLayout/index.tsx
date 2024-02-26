import { Outlet, useLocation } from 'react-router-dom';

import BottomNavigation from 'components/common/BottomNavigation';
import SideNavigation from 'components/common/SideNavigation';
import Home from 'pages/Home';
import useBooleanState from 'utils/hooks/useBooleanState';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './DefaultLayout.module.scss';

export default function DefaultLayout(): JSX.Element {
  const { isMobile } = useMediaQuery();
  const location = useLocation();
  const [visible, , , toggle, setVisible] = useBooleanState(false);
  return (
    <>
      {!isMobile && <SideNavigation visible={visible} toggle={toggle} setVisible={setVisible} />}
      <div
        className={cn({
          [styles['home-container']]: true,
          [styles['home-container--invisible']]: location.pathname !== '/',
        })}
      >
        <Home visible={visible} />
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
      {isMobile && <BottomNavigation />}
    </>
  );
}

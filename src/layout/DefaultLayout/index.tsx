import { Outlet, useLocation } from 'react-router-dom';
import BottomNavigation from 'components/common/BottomNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import TopNavigation from 'components/common/TopNavigation';
import Home from 'pages/Home';
import cn from 'utils/ts/classNames';
import styles from './DefaultLayout.module.scss';

export default function DefaultLayout(): JSX.Element {
  const { isMobile } = useMediaQuery();
  const location = useLocation();
  return (
    <>
      {!isMobile && <TopNavigation />}
      <Outlet />
      <div className={cn({ [styles.home]: location.pathname !== '/' })}>
        <Home />
      </div>
      {isMobile && <BottomNavigation />}
    </>
  );
}

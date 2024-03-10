import { Outlet } from 'react-router-dom';

import TopNavigation from 'components/common/TopNavigation';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import styles from './TopDefaultLayout.module.scss';

export default function TopDefaultLayout(): JSX.Element {
  const { isMobile } = useMediaQuery();
  return (
    <>
      {!isMobile && <TopNavigation />}
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

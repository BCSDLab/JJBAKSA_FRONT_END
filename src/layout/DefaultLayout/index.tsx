import { Outlet, useLocation } from 'react-router-dom';
import Home from 'pages/Home';
import cn from 'utils/ts/classNames';
import styles from './DefaultLayout.module.scss';

export default function DefaultLayout(): JSX.Element {
  const location = useLocation();
  return (
    <>
      <Outlet />
      <div className={cn({ [styles.home]: location.pathname !== '/' })}>
        <Home />
      </div>
    </>
  );
}

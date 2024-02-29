import LocationSelectModal from 'pages/Home/LocationSelectModal/index';
import Map from 'pages/Home/Map/index';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './Home.module.scss';

export default function Home({ visible }: { visible: boolean }): JSX.Element {
  const { isMobile } = useMediaQuery();

  return (
    <>
      {!isMobile && <LocationSelectModal />}
      <div
        className={cn({
          [styles['map-container']]: true,
          [styles['map-container--expand']]: visible,
        })}
      >
        <Map />
      </div>
    </>
  );
}
